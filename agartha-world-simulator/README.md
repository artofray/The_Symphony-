# Agartha World Simulator (Desktop Screensaver MVP)

Live desktop simulation where worker bots continuously build Agartha from observed code activity.

## Features

- Always-on "world growing" visual simulation
- Happy hard-hat builder bots (lobster/umpa-style)
- Live growth driven by real codebase changes
- Camera angle selector (`isometric`, `top`, `ground`)
- Sleep mode visual softening
- Limited bot animations (`bounce`, `sway`, `blink`)
- Per-agent appearance editor:
  - body/hat/eye colors
  - size
  - animation style
  - JSON import/export bridge for Mirage Avatar Studio-style data
- ASMR soundscape controls:
  - Rain
  - Low Hum
  - Soft Chimes
  - Volume

## Run

```powershell
cd C:\Users\admin\.openclaw\workspace\agartha-world-simulator
npm install
npm start
```

## Pick what codebase powers growth

By default it watches `C:\Users\admin\.openclaw\workspace`.

To target a specific repo/folder:

```powershell
$env:AGARTHA_CODE_PATH="C:\path\to\your\repo"
npm start
```

## Notes

- This is an MVP simulation model (visual metaphor of code manifestation).
- Next step can add:
  - true 3D engine (Three.js/WebGPU)
  - camera rails + cinematic keyframes
  - real build events from git commits / CI runs
  - Quest/Oculus remote viewer stream mode
