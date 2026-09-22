import type { SupportResponse } from "./mock";
import { MOCK_RESPONSE } from "./mock";

export interface InvokeInput {
  message: string;
  customerId: string;
  sessionId: string;
}

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL ?? "";
const RUNTIME_URL = process.env.NEXT_PUBLIC_RUNTIME_URL ?? "";

/**
 * Live path: POST to the AgentCore Gateway or Runtime URL when configured.
 * Falls back to a local 404-style error so the UI can show its error state.
 * Replace the fetch shape with the deployed contract; response mapping stays here.
 */
export async function invokeSupport(input: InvokeInput): Promise<SupportResponse> {
  const endpoint = GATEWAY_URL || RUNTIME_URL;
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 600));
    return {
      ...MOCK_RESPONSE,
      reply: `${MOCK_RESPONSE.reply} (preview mode: set NEXT_PUBLIC_GATEWAY_URL to call the live runtime.)`,
      sessionId: input.sessionId
    };
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      prompt: input.message,
      customer_id: input.customerId,
      session_id: input.sessionId
    })
  });
  if (!res.ok) throw new Error(`Gateway returned ${res.status}`);
  const data = await res.json();
  return {
    reply: String(data.result ?? data.reply ?? "No reply returned."),
    sessionId: String(data.session_id ?? input.sessionId),
    traceId: data.trace_id ? String(data.trace_id) : undefined,
    versions: Array.isArray(data.versions) ? data.versions : MOCK_RESPONSE.versions,
    citations: Array.isArray(data.citations) ? data.citations : MOCK_RESPONSE.citations,
    refund: data.refund ?? MOCK_RESPONSE.refund
  };
}
