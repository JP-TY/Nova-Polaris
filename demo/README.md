# Nova-Polaris Launch Demo (Remotion)

33.5-second product video: title, live Ops Console chat, orchestration
graph, feature grid, 120/120 scores, outro. 1280×720, 30 fps.

Rendered output: `out/nova-polaris-demo.mp4` (3.5 MB, committed; under
GitHub’s soft limits so no LFS needed — add LFS only if a future render
exceeds ~50 MB).

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
  --overwrite --browser-executable="$(which google-chrome-stable)"
```

## Scenes (`src/`)

| Scene | Length | Content |
|---|---|---|
| `TitleScene` | 3s | Star mark, serif title, typewriter tagline |
| `ConsoleScene` | 10s | Full Ops Console mock: rail, composer typing, Send → Routing…, skeleton, inspector fills WorkflowState v0–v3, citations, refund receipt, X-Ray trace, then typed agent reply |
| `GraphScene` | 9s | Animated X-Ray-style graph: orchestrator → 4 workers, return path lights with version badges, then policy fan-out to 3 parallel KB retrievers |
| `FeaturesScene` | 6s | Guardrails, Memory, KBs, WorkflowState, Observability, Evals |
| `ScoresScene` | 4.5s | Count-up to 120/120, per-task bars |
| `OutroScene` | 3s | Tagline lockup |

Transitions: fade and slide via `@remotion/transitions`.
Type: Instrument Serif display plus IBM Plex Sans body
(`@remotion/google-fonts`). All motion is frame-driven
(`useCurrentFrame`, springs, `interpolate`); no CSS animations.

Console copy and tokens mirror `frontend/` (`lib/mock.ts`,
`app/globals.css`). Graph labels mirror `submission/service_graph.json`.
