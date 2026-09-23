const DOT: Record<string, string> = {
  Orchestrator: "neutral",
  InventoryAgent: "route",
  PolicyAgent: "ground",
  RefundAgent: "resolve",
  CommunicationAgent: "neutral"
};

export default function Timeline({ versions }: { versions: { version: number; agent: string; summary: string }[] }) {
  if (!versions.length) {
    return (
      <p className="empty-hint">
        Send a request to open a session. Versions v0 to vN appear here with optimistic locking.
      </p>
    );
  }
  return (
    <ol className="timeline">
      {versions.map((v) => (
        <li key={v.version}>
          <span className={`dot ${DOT[v.agent] ?? "neutral"}`} aria-hidden="true" />
          <span>
            <strong className="mono">v{v.version}</strong> {v.agent}: {v.summary}
          </span>
        </li>
      ))}
    </ol>
  );
}
