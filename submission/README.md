# Nova-Polaris Submission Evidence

## 0. Populated `.env` (rubric 2.2 / 3.2 — required in the zip)
This folder contains a ready `.env` (gitignored; include it in the Udacity
package, never in the public GitHub mirror):

* `RETURNS_KB_ID=5JZE4EVDES`
* `SHIPPING_KB_ID=HNA3JVP0C2`
* `WARRANTY_KB_ID=1TTCSLBBBQ`
* `AGENTCORE_RUNTIME_ARN=arn:aws:bedrock-agentcore:us-east-1:646385694637:runtime/udacity_agentcore_runtime-jsnkhg8jP2`
* `GUARDRAIL_ID=mrihu5moh62s`
* `GUARDRAIL_VERSION=4` (numbered, not DRAFT)

Same file also lives at `starter/.env` for local test runs.

## 1. Automated suite — 120/120
Full output: `test_results.txt` (`python tests/test_agent.py all`, 100%).

## 2. X-Ray Service Map
I cannot screenshot the AWS console from here, so this folder holds
machine-verifiable equivalents plus the exact console steps:

* `xray_service_map.jpg` — console capture of the live service map.
* `service_graph.json` — node/edge list pulled via `BatchGetTraces` for
  traces `1-6ab2b525`, `1-6ab2b55a`, `1-6ab2b588`. Chain confirmed:
  `NovaMart-Orchestrator` → Inventory / Policy / Refund / Communication →
  `search_all_policies` → 3 retrievers → `KnowledgeBase:{returns,shipping,warranty}`.
* `service_map.svg` — rendering of that graph in Nova-Polaris tokens
  (supplement, not a substitute for the console shot).

Optional sharper screenshot (traces roll out of the 5-minute window):
1. Open https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#xray:service-map/map
2. Time range: Last 5 minutes. If empty, run
   `python src/agent_orchestrator.py test` in `starter/` and wait 60 s.
3. Capture the graph showing `NovaMart-Orchestrator` connected to the
   worker nodes incl. PolicyAgent → KnowledgeBase nodes at 100% zoom.

## Resources intentionally left running (no cleanup)
Stack `udacity-agentcore`, 3 KBs, guardrail v4, AgentCore Runtime/Memory,
Gateway. Delete after submitting:
`python infrastructure/cleanup.py` then `--yes` (also removes the
`udacity-agentcore-kb-role` IAM role created for the KBs).
