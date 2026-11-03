#!/usr/bin/env python3
"""Archive the two original OAP videos locally so CUTTRU no longer relies on Wix playback.

Run once from the repository root: python3 scripts/migrate-oap-media.py
Internet access and ffmpeg/ffprobe are required. This script refuses corrupt or missing media.
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "public" / "work" / "oap"
MAX_BYTES = 95 * 1024 * 1024  # GitHub rejects individual files over 100 MiB.
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


def download_video(url: str, destination: Path) -> int:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; CUTTRU-OAP-Migration/1.0)",
            "Accept": "video/mp4,application/octet-stream,*/*",
        },
    )
    received = 0
    with urllib.request.urlopen(request, timeout=90) as response, destination.open("wb") as output:
        status = response.status
        if status != 200:
            raise RuntimeError(f"Unexpected HTTP status: {status}")
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            received += len(chunk)
            if received > MAX_BYTES:
                raise RuntimeError("Video exceeds safe GitHub file-size limit")
            output.write(chunk)
    if received < 100_000:
        raise RuntimeError(f"Video is unexpectedly small ({received} bytes)")
    return received


def inspect_video(path: Path) -> float:
    result = subprocess.check_output(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=codec_name,width,height",
         "-show_entries", "format=duration", "-of", "json", str(path)],
        text=True,
    )
    data = json.loads(result)
    streams = data.get("streams", [])
    duration = float(data.get("format", {}).get("duration", 0))
    if not streams or duration < 1:
        raise RuntimeError(f"Invalid video stream/duration: {path.name}")
    print(f"Verified {path.name}: {streams[0]} duration={duration:.1f}s", flush=True)
    return duration


def make_poster(video: Path, poster: Path, duration: float) -> None:
    offset = min(2, duration / 2)
    subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
         "-ss", str(offset), "-i", str(video),
         "-frames:v", "1", "-q:v", "3", str(poster)],
        check=True,
    )
    if not poster.is_file() or poster.stat().st_size < 1000:
        raise RuntimeError(f"Poster generation failed: {poster.name}")


def main() -> None:
    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        raise RuntimeError("ffmpeg and ffprobe must be installed")
    DEST.mkdir(parents=True, exist_ok=True)
    manifest = []
    for slug, label, url in ITEMS:
        video = DEST / f"{slug}.mp4"
        poster = DEST / f"{slug}.jpg"
        if video.exists():
            inspect_video(video)
            print(f"Already archived: {video.name}", flush=True)
        else:
            with tempfile.NamedTemporaryFile(prefix="oap-", suffix=".mp4", dir=DEST, delete=False) as tmp:
                tmp_path = Path(tmp.name)
            try:
                print(f"Archiving {label}...", flush=True)
                download_video(url, tmp_path)
                inspect_video(tmp_path)
                os.replace(tmp_path, video)
            finally:
                tmp_path.unlink(missing_ok=True)
        duration = inspect_video(video)
        if not poster.is_file():
            make_poster(video, poster, duration)
        manifest.append({
            "label": label,
            "video": f"/work/oap/{slug}.mp4",
            "poster": f"/work/oap/{slug}.jpg",
            "bytes": video.stat().st_size,
            "sha256": hashlib.sha256(video.read_bytes()).hexdigest(),
            "duration_seconds": round(duration, 3),
        })
    (DEST / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("All OAP media archived and verified.", flush=True)


if __name__ == "__main__":
    main()
