export type AgentName =
  | "Orchestrator"
  | "InventoryAgent"
  | "PolicyAgent"
  | "RefundAgent"
  | "CommunicationAgent";

export interface Citation {
  source: string;
  score: number;
  text: string;
}

export interface RefundDecision {
  decision: "approved" | "denied" | "human_review";
  confidence: number;
  riskScore: number;
  reference?: string;
  reason: string;
}

export interface WorkflowVersion {
  version: number;
  agent: AgentName;
  summary: string;
}

export interface SupportResponse {
  reply: string;
  sessionId: string;
  traceId?: string;
  versions: WorkflowVersion[];
  citations: Citation[];
  refund?: RefundDecision;
}

export const MOCK_RESPONSE: SupportResponse = {
  reply:
    "Your Premium return for ORD-27176 is approved. A prepaid label is on its way, and the refund posts 5 to 7 business days after we receive the headphones.",
  sessionId: "a1b2c3d4",
  traceId: "1-00000000-0000000000000000",
  versions: [
    { version: 0, agent: "Orchestrator", summary: "Session created for CUST-001." },
    { version: 1, agent: "InventoryAgent", summary: "ORD-27176 delivered 12 days ago, Premium tier." },
    { version: 2, agent: "RefundAgent", summary: "Within 60-day window. Low risk." },
    { version: 3, agent: "CommunicationAgent", summary: "Final reply composed with citations." }
  ],
  citations: [
    {
      source: "policies/returns/return_policy.txt",
      score: 0.91,
      text: "Premium tier customers receive an extended 60-day return window."
    },
    {
      source: "policies/returns/customer_tiers.txt",
      score: 0.84,
      text: "Premium requires $500+ spend or 20+ orders per calendar year."
    }
  ],
  refund: {
    decision: "approved",
    confidence: 0.96,
    riskScore: 0.08,
    reference: "RET-9f3ka2qd",
    reason: "Delivered, within window, standard category."
  }
};
