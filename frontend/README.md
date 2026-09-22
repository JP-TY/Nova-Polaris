# Nova-Polaris Ops Console

Workbench console for the multi-agent support system. Route. Ground. Resolve.

## Run

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Live wiring

Set one of these to call the deployed system:

```bash
NEXT_PUBLIC_GATEWAY_URL=https://<gateway-id>.execute-api.us-east-1.amazonaws.com/prod
# or
NEXT_PUBLIC_RUNTIME_URL=https://<agentcore-runtime-endpoint>/invocations
```

Without either variable the console runs in preview mode with the `ORD-27176` golden response so layout, timeline, citations, decision receipt, and trace panel can be reviewed offline.

Request shape sent upstream:

```json
{ "prompt": "<message>", "customer_id": "CUST-001", "session_id": "a1b2c3d4" }
```

## Evidence ledger (README plan)

The root README hero follows Long Document + Newsprint: masthead with polar-star mark and tagline, one live request, an evidence table mapping each claim to source file plus retrieval score, the refund decision JSON, eval scores, guardrail matrix, and the X-Ray Service Map screenshot. The console is the interactive proof; the README is the durable record.
