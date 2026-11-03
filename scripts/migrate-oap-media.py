#!/usr/bin/env python3
"""Copy both Wix-hosted OAP works into CUTTRU's own static files.

The shorter MBC every1 clip is archived as its exact source MP4.
The 33-minute network-design reel is remuxed (NOT re-encoded or trimmed)
into HLS transport-stream chunks. No content or quality is discarded.
Run: python3 scripts/migrate-oap-media.py
Requires network access, ffmpeg, and ffprobe.
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "public" / "work" / "oap"
MAX_SINGLE_FILE = 85 * 1024 * 1024
MAX_SOURCE_BYTES = 2 * 1024 * 1024 * 1024
ITEMS = [
    (
        "mbc-every1",
        "MBC every1",
        "https://video.wixstatic.com/video/f455cd_4b8924d6e90346caa93e8df972fd64e2/480p/mp4/file.mp4",
    ),
    (
        "tooniverse-queeny-ongamenet",
        "Tooniverse, Queeny, OnGameNet",
        "https://video.wixstatic.com/video/f455cd_b4ade83cfa9f41f490c60c4a1c93cc8b/480p/mp4/file.mp4",
    ),
]


def hash_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def download_video(url: str, destination: Path) -> int:
    request = urllib.request.Request(
        url, headers={
            "User-Agent": "Mozilla/5.0 (compatible; CUTTRU-OAP-Migration/1.0)",
            "Accept": "video/mp4,application/octet-stream,*/*",
        }
    )
    total = 0
    with urllib.request.urlopen(request, timeout=120) as response, destination.open("wb") as output:
        if response.status != 200:
            raise RuntimeError(f"Source returned HTTP {response.status}")
        for chunk in iter(lambda: response.read(1024 * 1024), b""):
            total += len(chunk)
            if total > MAX_SOURCE_BYTES:
                raise RuntimeError("Source exceeds 2 GiB safety limit")
            output.write(chunk)
    if total < 100_000:
        raise RuntimeError(f"Suspiciously small source: {total} bytes")
    print(f"Downloaded {total / 1048576:.1f} MiB", flush=True)
    return total


def probe(path: Path) -> dict:
    raw = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries",
         "stream=codec_name,codec_type,width,height:format=duration",
         "-of", "json", str(path)],
        text=True,
    )
    data = json.loads(raw)
    streams = data.get("streams", [])
    duration = float(data.get("format", {}).get("duration", 0))
    video = next((s for s in streams if s.get("codec_type") == "video"), None)
    if not video or duration < 1:
        raise RuntimeError(f"Invalid video/duration in {path.name}")
    return {
        "duration": duration,
        "codec": video.get("codec_name"),
        "width": video.get("width"),
        "height": video.get("height"),
        "audio_tracks": sum(s.get("codec_type") == "audio" for s in streams),
    }


def make_poster(source: Path, poster: Path, duration: float) -> None:
    if poster.is_file() and poster.stat().st_size > 1000:
        return
    subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
         "-ss", str(min(2.0, duration / 2)),
         "-i", str(source), "-frames:v", "1", "-q:v", "3", str(poster)],
        check=True,
    )
    if not poster.is_file() or poster.stat().st_size <= 1000:
        raise RuntimeError(f"Unable to create poster {poster}")


def make_hls(source: Path, slug: str, expected_duration: float) -> tuple[Path, list[dict]]:
    playlist = DEST / f"{slug}.m3u8"
    pattern = str(DEST / f"{slug}-%04d.ts")
    for segment in DEST.glob(f"{slug}-*.ts"):
        segment.unlink()
    playlist.unlink(missing_ok=True)
    subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
         "-map", "0:v:0", "-map", "0:a?", "-c", "copy",
         "-f", "hls", "-hls_time", "30", "-hls_list_size", "0",
         "-hls_playlist_type", "vod", "-hls_flags", "independent_segments",
         "-hls_segment_filename", pattern, str(playlist)],
        check=True,
    )
    lines = [line.strip() for line in playlist.read_text(encoding="utf-8").splitlines()]
    if "#EXT-X-ENDLIST" not in lines or "#EXT-X-PLAYLIST-TYPE:VOD" not in lines:
        raise RuntimeError("HLS playlist is not a complete VOD")
    durations = [float(x) for x in re.findall(r"#EXTINF:([0-9.]+)", "\n".join(lines))]
    names = [x for x in lines if x and not x.startswith("#")]
    if not names or len(durations) != len(names):
        raise RuntimeError("HLS playlist contains missing segments")
    if abs(sum(durations) - expected_duration) > max(2.0, expected_duration * .001):
        raise RuntimeError(
            f"HLS duration mismatch: {sum(durations):.2f}s vs {expected_duration:.2f}s"
        )
    chunks = []
    for name in names:
        if Path(name).name != name or not name.startswith(f"{slug}-") or not name.endswith(".ts"):
            raise RuntimeError(f"Unsafe media segment name: {name}")
        segment = DEST / name
        if not segment.exists() or not 1000 < segment.stat().st_size < MAX_SINGLE_FILE:
            raise RuntimeError(f"Invalid or oversized media segment: {segment}")
        if segment.open("rb").read(1) != b"\\x47":
            raise RuntimeError(f"Not a valid MPEG transport-stream segment: {name}")
        chunks.append({
            "path": f"/work/oap/{name}",
            "bytes": segment.stat().st_size,
            "sha256": hash_file(segment),
        })
    print(f"Verified HLS VOD: {len(chunks)} source-quality chunks, "
          f"{sum(x['bytes'] for x in chunks) / 1048576:.1f} MiB, "
          f"{sum(durations):.1f}s", flush=True)
    return playlist, chunks


def main() -> None:
    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        raise RuntimeError("ffmpeg and ffprobe required")
    DEST.mkdir(parents=True, exist_ok=True)
    manifest = []
    for slug, label, url in ITEMS:
        print(f"Archiving {label}", flush=True)
        with tempfile.NamedTemporaryFile(prefix="oap-", suffix=".mp4", dir=DEST, delete=False) as temp:
            source = Path(temp.name)
        try:
            download_video(url, source)
            info = probe(source)
            original_digest = hash_file(source)
            print(f"Source {info}, SHA256 {original_digest}", flush=True)
            poster = DEST / f"{slug}.jpg"
            make_poster(source, poster, info["duration"])
            if slug == "mbc-every1":
                dest_video = DEST / f"{slug}.mp4"
                if source.stat().st_size >= MAX_SINGLE_FILE:
                    raise RuntimeError("MBC source exceeds single-file limit")
                os.replace(source, dest_video)
                manifest.append({
                    "label": label,
                    "format": "mp4",
                    "video": f"/work/oap/{slug}.mp4",
                    "poster": f"/work/oap/{slug}.jpg",
                    "duration_seconds": round(info["duration"], 3),
                    "bytes": dest_video.stat().st_size,
                    "sha256": hash_file(dest_video),
                    "source_sha256": original_digest,
                    "video_codec": info["codec"],
                    "audio_tracks": info["audio_tracks"],
                })
            else:
                playlist, segments = make_hls(source, slug, info["duration"])
                manifest.append({
                    "label": label,
                    "format": "hls",
                    "video": f"/work/oap/{slug}.m3u8",
                    "poster": f"/work/oap/{slug}.jpg",
                    "duration_seconds": round(info["duration"], 3),
                    "bytes": sum(x["bytes"] for x in segments),
                    "sha256": hash_file(playlist),
                    "source_sha256": original_digest,
                    "video_codec": info["codec"],
                    "audio_tracks": info["audio_tracks"],
                    "segments": segments,
                    "remuxed_without_reencoding": True,
                })
        finally:
            source.unlink(missing_ok=True)
    (DEST / "manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print("OAP archival complete: 2 entire videos, local posters, checksums.", flush=True)


if __name__ == "__main__":
    main()
