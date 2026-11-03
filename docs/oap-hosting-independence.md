# OAP hosting independence — shutdown checklist

The CUTTRU OAP & Branding page is designed to stop loading O-VATION/Wix media
once the associated media and player pull requests are merged and deployed.

## Files and source integrity

- **MBC every1 (2007):** 269.268 seconds, 720×486 H.264 + audio. Exact source MP4, local path `/work/oap/mbc-every1.mp4`. Original SHA-256: `e8c519f22d3b8ba9e0ddcb089fc06cbcd72ca062d0b6fcd7170f451f9c21adee`.
- **Tooniverse / Queeny / OnGameNet (2002):** 2012.658 seconds, 640×480 H.264 + audio. Original MP4 246.3 MiB is **remuxed without re-encoding** to HLS playlist `/work/oap/tooniverse-queeny-ongamenet.m3u8` and 68 MPEG-TS chunks. Original SHA-256: `efd8624a825f2a35e5f74d0d2a278cd7c8f236914b4456537b9bdf19b3a9bb77`.
- Both poster images are local. All video and segment digests are recorded in `public/work/oap/manifest.json`.
- The browser uses the MP4 natively, and uses native HLS (iOS/Safari) or bundled `hls.js` (other modern browsers).

## Conditions **before** cancelling the old O-VATION hosting/domain

1. Confirm all 68 HLS chunks and both posters have been uploaded into CUTTRU's repository, and merge the media migration PR into `main`.
2. Merge the OAP player PR into `main`, with `hls.js` committed in both `package.json` and `package-lock.json`.
3. Trigger the Netlify production deploy for CUTTRU if automatic deploys are disabled.
4. On the actual production page `/work/branding`, check **both** video players, picture, sound, seeking, playback at the end, and browser network requests in Chrome + iPhone Safari. The page must make **no** request to `video.wixstatic.com` or `static.wixstatic.com`.
5. Check the existing Trailer and Films & Video routes, their local posters/MP4 files, and working YouTube embeds. The older source contained missing/unavailable trailer videos; do not treat poster-only entries as recovered originals.
6. Keep the original site intact until CUTTRU production checks pass, then consider deactivating the O-VATION site/domain separately.

## Ongoing cost caution

CUTTRU's long OAP reel is ~246 MiB of source-quality media (served progressively as watched).
Large-volume streaming consumes Netlify bandwidth/credits; monitor traffic. The free
tier has a monthly cap and may pause sites on reaching it. No background automatic
deactivation of O-VATION is part of this migration.
