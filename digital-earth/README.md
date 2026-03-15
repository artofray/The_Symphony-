# Digital Earth Twin (Browser)

## Run

Open `index.html` in a browser, or host locally:

```powershell
cd C:\Users\admin\.openclaw\workspace\digital-earth
python -m http.server 8088
```

Then open: `http://localhost:8088`

## Features

- Orbital Earth with realistic satellite base imagery
- Toggle clouds overlay
- Toggle atmosphere
- Toggle night lights overlay
- Jump to major cities and zoom into 3D terrain/buildings
- Orbital auto-spin toggle
- Quantum Oasis module panel with category filters
- Music Machine Gateway interactive chapter player:
  - Launch from the `Music Machine Gateway` module card
  - Play/Pause chaptered story (warehouse -> elevator -> descent -> Agartha)
  - Prev/Next chapter controls and synchronized camera moves
- Agartha Weather panel:
  - Live conditions via Open-Meteo
  - Active warning cards via NWS Alerts API (US coverage)
  - Auto-refresh every 60 seconds
  - Location can be manually entered or auto-linked to selected city jumps

## Notes

- Some Cesium datasets may require an Ion token for best reliability.
- If geocoding fails, use city presets like `New York` or `Tokyo`.
- Night layer uses NASA Black Marble WMTS tiles.
- Optional local render link inside the gateway panel expects:
  - `./media/agartha-intro-v1.mp4`
