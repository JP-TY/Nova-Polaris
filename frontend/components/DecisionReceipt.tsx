import type { RefundDecision } from "../lib/mock";

export default function DecisionReceipt({ refund }: { refund?: RefundDecision }) {
  if (!refund) return <p>No refund evaluated in this turn.</p>;
  return (
    <div className="receipt">
      <p>
        <strong>Decision:</strong> {refund.decision} ·{" "}
        <strong className="mono">confidence {refund.confidence.toFixed(2)}</strong> ·{" "}
        <strong className="mono">risk {refund.riskScore.toFixed(2)}</strong>
      </p>
      <p>{refund.reason}</p>
      {refund.reference ? (
        <p className="mono">Reference: {refund.reference}</p>
      ) : (
        <p>Flagged for human review. No reference issued.</p>
      )}
    </div>
  );
}
