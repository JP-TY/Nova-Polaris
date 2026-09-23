# Product

## Register

product

## Users

Hiring manager reviewing a portfolio in daylight, scanning for evidence of grounding, routing correctness, and traceability. Support operator resolving customer requests, checking refund risk, policy citations, and X-Ray traces. Both need instant readability over decoration.

## Product Purpose

Nova-Polaris is an autonomous support operations center. Five Strands agents in an Orchestrator to Workers hierarchy route requests, ground answers in three Bedrock Knowledge Bases via parallel multi-agent RAG, enforce Bedrock Guardrails, and accumulate shared DynamoDB WorkflowState with optimistic locking. Every request is traced to X-Ray and logged to CloudWatch. Success is 120/120 on the automated suite plus a readable end-to-end trace.

Tagline: Route. Ground. Resolve.

## Brand Personality

Calm, precise, navigational. Voice is technical and quiet. No hype, no emojis in UI, no restated headings.

## Anti-references

No SaaS hero-metric bands with big numbers and gradient accents. No identical card grids. No gradient text, no glassmorphism as default, no side-stripe borders, no modals as first thought. Dark is a deliberate full-console choice (DESIGN.md), not a neon cyan cliché.

## Design Principles

1. Evidence over claims: every answer cites source file plus retrieval score or states it is not in policy.
2. Show the route: WorkflowState version chain v0 to vN is always visible.
3. Risk made explicit: refund decisions ship as JSON with decision, confidence, and risk flags, including human review path.
4. Calm density: operator rhythm over decoration. Consistency across screens is a virtue.

## Accessibility & Inclusion

WCAG AA. Body contrast 4.5:1 minimum. Visible focus rings. Full keyboard paths. Touch targets 44px minimum. Respect prefers-reduced-motion. Tabular numerals for session IDs, latency, and cost.
