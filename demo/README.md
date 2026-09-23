# Nova-Polaris Launch Demo (Remotion)

25-second launch video: title, architecture, live request trace,
120/120 scores, outro. 1280x720, 30fps, ~23s.

Rendered output: `out/nova-polaris-demo.mp4` (1.9 MB, committed).

## Run

```bash
cd demo
npm install
npm run build    # renders out/nova-polaris-demo.mp4
npm run preview  # Remotion Studio
```

Rendering needs a browser: the bundled Headless Shell download may not
persist on some machines. Point at system Chrome instead:

```bash
npx remotion render NovaPolarisDemo out/nova-polaris-demo.mp4 \
  --browser-executable="$(which google-chrome-stable)"
```

## Scenes (`src/`)

| Scene | Length | Content |
|---|---|---|
| `TitleScene` | 4s | Star mark, serif title, typewriter tagline |
| `ArchitectureScene` | 6s | Orchestrator plus 4 workers stagger in, KB chips |
| `TraceScene` | 7s | Typed query, v0-v3 routing steps appear in order |
| `ScoresScene` | 5s | Count-up to 120/120, per-task bars grow |
| `OutroScene` | 3s | Tagline lockup |

Transitions: fade and slide via `@remotion/transitions`.
Type: Instrument Serif display plus IBM Plex Sans body
(`@remotion/google-fonts`). All motion is frame-driven
(`useCurrentFrame`, springs, `interpolate`); no CSS animations.
