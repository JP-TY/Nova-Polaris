export const PAPER = 'oklch(98.5% 0.008 240)';
export const PANEL = 'oklch(96% 0.01 250)';
export const DARK = 'oklch(24% 0.03 270)';
export const DARK_PANEL = 'oklch(28% 0.035 270)';
export const INK = 'oklch(22% 0.03 270)';
export const INK_SOFT = 'oklch(38% 0.04 270)';
export const INK_ON_DARK = 'oklch(93% 0.01 250)';
export const LINE = 'oklch(88% 0.012 250)';
export const ROUTE = 'oklch(62% 0.14 215)';
export const GROUND = 'oklch(62% 0.14 290)';
export const RESOLVE = 'oklch(68% 0.12 85)';
export const SUCCESS = 'oklch(65% 0.12 160)';
export const DANGER = 'oklch(60% 0.15 25)';
export const INK_SOFT_DARK = 'oklch(72% 0.02 250)';
export const LINE_DARK = 'oklch(42% 0.03 270)';
export const DARK_MSG = 'oklch(29% 0.035 270)';
export const INPUT_BG = 'oklch(20% 0.025 270)';
export const CITE_BG = 'oklch(96% 0.02 290)';
export const NAV_ACTIVE = 'oklch(93% 0.03 220)';
export const ACCENT_DARK_TEXT = 'oklch(20% 0.03 240)';
export const NEUTRAL_DOT = 'oklch(55% 0.02 260)';
export const SKELETON_A = 'oklch(31% 0.03 270)';
export const SKELETON_B = 'oklch(37% 0.03 270)';
export const MSG_CUSTOMER_LINE = 'oklch(48% 0.05 220)';
export const MSG_AGENT_LINE = 'oklch(48% 0.05 160)';
export const TINT_ROUTE = 'oklch(99% 0.005 215)';
export const TINT_GROUND = 'oklch(99% 0.005 290)';
export const TINT_RESOLVE = 'oklch(99% 0.005 85)';

export const AGENTS = [
  {name: 'InventoryAgent', desc: 'DynamoDB lookups', color: ROUTE},
  {name: 'PolicyAgent', desc: 'parallel RAG x3 KBs', color: GROUND},
  {name: 'RefundAgent', desc: '30d / 60d windows', color: RESOLVE},
  {name: 'CommunicationAgent', desc: 'final reply', color: SUCCESS},
] as const;

export const TRACE_STEPS = [
  {label: 'initialize_session', detail: 'WorkflowState v0 opened'},
  {label: 'route_to_inventory_agent', detail: 'ORD-27176 delivered, Premium tier'},
  {label: 'route_to_refund_agent', detail: 'within 60d window, RET-issued'},
  {label: 'route_to_communication_agent', detail: 'cited reply composed'},
] as const;

export const SCORES = [
  {task: 'Orchestration', pts: '40/40'},
  {task: 'Guardrails + Runtime', pts: '20/20'},
  {task: 'Memory', pts: '15/15'},
  {task: 'Knowledge Bases', pts: '25/25'},
  {task: 'Observability', pts: '20/20'},
] as const;

export const QUERY =
  'I want to return my wireless headphones from order ORD-27176';

export const REPLY =
  'Your Premium return for ORD-27176 is approved. A prepaid label is on its way, and the refund posts 5 to 7 business days after we receive the headphones.';

export const VERSIONS = [
  {
    version: 0,
    agent: 'Orchestrator',
    dot: 'neutral',
    summary: 'Session created for CUST-001.',
  },
  {
    version: 1,
    agent: 'InventoryAgent',
    dot: 'route',
    summary: 'ORD-27176 delivered 12 days ago, Premium tier.',
  },
  {
    version: 2,
    agent: 'RefundAgent',
    dot: 'resolve',
    summary: 'Within 60-day window. Low risk.',
  },
  {
    version: 3,
    agent: 'CommunicationAgent',
    dot: 'neutral',
    summary: 'Final reply composed with citations.',
  },
] as const;

export const CITATIONS = [
  {
    text: 'Premium tier customers receive an extended 60-day return window.',
    source: 'policies/returns/return_policy.txt',
    score: '0.91',
  },
  {
    text: 'Premium requires $500+ spend or 20+ orders per calendar year.',
    source: 'policies/returns/customer_tiers.txt',
    score: '0.84',
  },
] as const;

export const REFUND = {
  decision: 'approved',
  confidence: '0.96',
  risk: '0.08',
  reason: 'Delivered, within window, standard category.',
  reference: 'RET-9f3ka2qd',
} as const;

export const TRACE_ID = '1-6ab2be8d-0a1b2c3d4e5f678901234567';
export const SESSION_ID = 'a1b2c3d4';

export const FEATURES = [
  {
    title: 'Guardrails',
    accent: 'danger' as const,
    detail: 'Bedrock Guardrail v4',
    body: 'PII block and anonymize, deny topics, content filters on every model call.',
  },
  {
    title: 'AgentCore Memory',
    accent: 'route' as const,
    detail: 'SessionSummary · 7-day events',
    body: 'Conversation summaries persist per session so follow-ups keep context.',
  },
  {
    title: 'Knowledge Bases',
    accent: 'ground' as const,
    detail: 'returns · shipping · warranty',
    body: 'PolicyAgent fans out to three retrievers in parallel over S3 Vectors.',
  },
  {
    title: 'WorkflowState',
    accent: 'resolve' as const,
    detail: 'DynamoDB optimistic locking',
    body: 'Every hop bumps version v0 to vN with a conditional write and retries.',
  },
  {
    title: 'Observability',
    accent: 'success' as const,
    detail: 'X-Ray · CloudWatch 100%',
    body: 'One trace per request: orchestrator root, worker subsegments, KB spans.',
  },
  {
    title: 'Evals',
    accent: 'route' as const,
    detail: '120/120 · tasks 2–6',
    body: 'Orchestration, guardrails, memory, KBs, and observability all green.',
  },
] as const;
