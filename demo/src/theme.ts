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
