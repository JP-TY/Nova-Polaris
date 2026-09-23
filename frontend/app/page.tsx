"use client";

import { useState } from "react";
import Timeline from "../components/Timeline";
import CitationRow from "../components/CitationRow";
import DecisionReceipt from "../components/DecisionReceipt";
import { invokeSupport } from "../lib/agentcore";
import type { SupportResponse } from "../lib/mock";

function newSession(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function OpsConsole() {
  const [customerId, setCustomerId] = useState("CUST-001");
  const [message, setMessage] = useState("I want to return my wireless headphones from order ORD-27176");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [result, setResult] = useState<SupportResponse | null>(null);
  const [error, setError] = useState("");
  const [sessionId] = useState(newSession());

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await invokeSupport({ message: message.trim(), customerId, sessionId });
      setResult(res);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed. Check the gateway URL and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="app">
      <a className="skip-link" href="#chat">Skip to chat</a>
      <aside className="rail" aria-label="Workspace">
        <div className="brand">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="26" fill="none" stroke="var(--accent-route)" strokeWidth="2.5" />
            <path d="M32 6 L35 29 L58 32 L35 35 L32 58 L29 35 L6 32 L29 29 Z" fill="var(--accent-route)" />
            <circle cx="32" cy="32" r="3.5" />
          </svg>
          <div>
            <div className="brand-name">Nova-Polaris</div>
            <div className="brand-tag">Route. Ground. Resolve.</div>
          </div>
        </div>
        <nav aria-label="Primary">
          <a href="#" aria-current="page">Sessions</a>
          <a href="#evidence">Evals</a>
          <a href="#trace">Traces</a>
        </nav>
        <div className="field">
          <label htmlFor="customer">Customer</label>
          <select id="customer" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
            <option value="CUST-001">CUST-001 · Premium</option>
            <option value="CUST-002">CUST-002 · Standard</option>
            <option value="CUST-003">CUST-003 · Premium</option>
            <option value="CUST-004">CUST-004 · Standard</option>
          </select>
          <p className="session-id">Session: {sessionId}</p>
        </div>
      </aside>

      <main className="stream" id="chat">
        <h1>Support Ops Center</h1>
        <p className="lede">Route to the right specialist, ground every claim in policy, resolve with a cited reply.</p>
        <section className="chat" aria-live="polite" aria-label="Conversation">
          {!result && status !== "loading" && (
            <div className="msg agent">
              <div className="who"><span className="dot neutral" />CommunicationAgent · ready</div>
              <p>Ask about a return, a policy, or an order. The route and evidence appear on the right.</p>
            </div>
          )}
          {status === "loading" && (
            <div className="skeleton" role="status" aria-label="Resolving request" />
          )}
          {status === "error" && (
            <div className="msg agent" role="alert">
              <div className="who"><span className="dot resolve" />Request failed</div>
              <p>{error}</p>
              <p>Recovery: verify the gateway URL, then resend. No workflow version was written.</p>
            </div>
          )}
          {result && status !== "loading" && (
            <>
              <div className="msg customer">
                <div className="who"><span className="dot route" />{customerId} · you</div>
                <p>{message}</p>
              </div>
              <div className="msg agent">
                <div className="who"><span className="dot ground" />CommunicationAgent · cited reply</div>
                <p>{result.reply}</p>
              </div>
            </>
          )}
          <form className="composer" onSubmit={onSubmit}>
            <label htmlFor="prompt">Message</label>
            <input
              id="prompt"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a support request"
              autoComplete="off"
            />
            <button className="btn" type="submit" disabled={status === "loading" || !message.trim()}>
              {status === "loading" ? "Routing…" : "Send"}
            </button>
          </form>
        </section>
      </main>

      <aside className="inspector" aria-label="Evidence">
        <section className="panel panel--route" aria-label="Workflow state">
          <h2>Route · WorkflowState</h2>
          <Timeline versions={result?.versions ?? []} />
        </section>
        <section className="panel panel--ground" id="evidence" aria-label="Grounded evidence">
          <h2>Ground · Citations</h2>
          <CitationRow citations={result?.citations ?? []} />
        </section>
        <section className="panel panel--resolve" aria-label="Refund decision">
          <h2>Resolve · Decision</h2>
          <DecisionReceipt refund={result?.refund} />
        </section>
        <section className="panel panel--trace" id="trace" aria-label="Trace">
          <h2>Trace receipt</h2>
          {result?.traceId ? (
            <p className="mono">X-Ray: {result.traceId}<br />Session: {result.sessionId}</p>
          ) : (
            <p className="empty-hint">
              No trace yet. Each live request publishes one X-Ray trace for the Service Map
              screenshot.
            </p>
          )}
        </section>
      </aside>

      <footer className="statusbar">
        <span>Nova-Polaris console · Next.js</span>
        <span className="mono">Haiku routing · Sonnet workers</span>
        <span className="mono">3 KBs · Guardrailed · Traced</span>
      </footer>
    </div>
  );
}
