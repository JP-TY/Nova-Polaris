# Nova-Polaris Submission Evidence

## 1. Automated suite — 120/120
Full output: `test_results.txt` (`python tests/test_agent.py all`, 100%).

## 2. X-Ray Service Map
I cannot screenshot the AWS console from here, so this folder holds
machine-verifiable equivalents plus the exact console steps:

* `service_graph.json` — node/edge list pulled via `BatchGetTraces` for
  traces `1-6ab2b525`, `1-6ab2b55a`, `1-6ab2b588`. Chain confirmed:
  `NovaMart-Orchestrator` → Inventory / Policy / Refund / Communication →
  `search_all_policies` → 3 retrievers → `KnowledgeBase:{returns,shipping,warranty}`.
* `service_map.svg` — rendering of that graph in Nova-Polaris tokens
  (supplement, not a substitute for the console shot).

Console screenshot (2 min, do now — traces roll out of the 5-min window):
1. Open https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#xray:service-map/map
2. Time range: Last 5 minutes. If empty, run
   `python src/agent_orchestrator.py test` in `starter/` and wait 60 s.
3. Capture the graph showing `NovaMart-Orchestrator` connected to the
   worker nodes incl. PolicyAgent → KnowledgeBase nodes.

## Resources intentionally left running (no cleanup)
Stack `udacity-agentcore`, 3 KBs, guardrail v4, AgentCore Runtime/Memory,
Gateway. Delete after submitting:
`python infrastructure/cleanup.py` then `--yes` (also removes the
`udacity-agentcore-kb-role` IAM role created for the KBs).
