# DESIGN.md — Nova-Polaris

> Tagline: Route. Ground. Resolve.
> Register: product (Ops Console primary, README evidence ledger defers to same tokens)

## Theme

Scene: hiring manager scans README and live console in a bright office, then opens the X-Ray trace and WorkflowState timeline to verify grounding. Needs instant readability, not night-ops glow.

Decision: light paper default with dark console inset. Avoids first-order reflex (observability equals dark blue) and second-order trap (terminal-native dark mode everywhere).

Color strategy: Restrained. Tinted neutrals plus one accent at or under 10 percent, with two semantic roles used deliberately (cite violet, risk amber).

## Colors

All color as OKLCH tokens, referenced by name. No inline hex in components.

```css
:root {
  --paper-doc: oklch(98.5% 0.008 240);
  --paper-console: oklch(24% 0.03 270);
  --paper-panel: oklch(96% 0.01 250);
  --ink: oklch(22% 0.03 270);
  --ink-soft: oklch(38% 0.04 270);
  --line: oklch(88% 0.012 250);
  --accent-route: oklch(62% 0.14 215);
  --accent-ground: oklch(62% 0.14 290);
  --accent-resolve: oklch(68% 0.12 85);
  --success: oklch(65% 0.12 160);
  --danger: oklch(60% 0.15 25);
  --focus: oklch(62% 0.14 215);
}
```

Agent hues (terminal trace plus console timeline, consistent): Orchestrator neutral, Inventory route-teal, Policy ground-violet, Refund resolve-amber, Communication green. Dots plus labels plus background tints. No side-stripe borders.

## Typography

Display (docs masthead only): Instrument Serif, roman only. Body/UI/data: IBM Plex Sans or system stack. Mono (sessions, traces, latency): Geist Mono or JetBrains Mono with tabular-nums.

Scale: product-tight 1.125 to 1.2 steps with fixed rem sizes. Body 16px, line-height 1.5, prose capped 65-75ch. Tables may run denser.

## Layout

Workbench console: N3 side-rail (Sessions, Evals, Traces), center chat stream, right inspector (WorkflowState v0 to vN, KB citations with scores, refund JSON, trace link). Predictable grids, familiar patterns, structural responsive (collapse rail under 768px). Cards only where best affordance. No nested cards. No global container wrapping everything.

README ledger: Long Document. Masthead with polar-star mark and tagline, live request, evidence ledger table, risk decision, eval scores, guardrail matrix, trace screenshot.

## Components

Buttons, inputs, timeline rows, citation rows, decision receipts: default, hover, focus-visible, active, disabled, loading (skeleton, not spinner in content), error, empty (teaches the interface). One button shape, one form vocabulary, one Lucide-style icon set.

## Motion

150 to 250ms, transform and opacity only, ease-out-expo. Enter combines opacity with small translateY. Exit shorter and quieter. Press scale 0.96 on tactile buttons where it does not distract. Crossfade for content replacement. Interruptible. Respect prefers-reduced-motion.

## Bans

No gradient text. No glassmorphism as default. No side-stripe accent borders. No hero-metric template. No identical card grids. No modal as first thought. No em dashes in copy.
