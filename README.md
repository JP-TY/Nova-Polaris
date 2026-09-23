# Nova-Polaris — Support Ops Center

**Route. Ground. Resolve.**

A production-grade multi-agent customer support system built with the
[Strands Agents SDK](https://github.com/strands-agents/sdk-python) and
[Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/).
A central orchestrator routes customer requests to specialist workers that read
orders from DynamoDB, retrieve policy via parallel multi-agent RAG, decide
refund eligibility, and compose the final reply. Every request is guarded,
memorized, logged, and traced.

| Suite | Score |
|---|---|
| Task 2 — multi-agent orchestration | 40/40 |
| Task 3 — guardrails + AgentCore runtime | 20/20 |
| Task 4 — session memory | 15/15 |
| Task 5 — knowledge bases + parallel retrieval | 25/25 |
| Task 6 — observability | 20/20 |
| **Total** | **120/120** |

## Architecture

```text
Customer Request
      |
OrchestratorAgent (Claude Haiku 4.5 — routing, WorkflowState)
      |
  +---+-----------+------------+--------------+
  |   |           |            |              |
Inventory   PolicyAgent   RefundAgent   CommunicationAgent
(DynamoDB)  (RAG x3 KBs)  (eligibility) (final reply)
                |
   ReturnsRetriever / ShippingRetriever / WarrantyRetriever
   (run in PARALLEL via ThreadPoolExecutor, Bedrock KBs on S3 Vectors)

Shared state: DynamoDB WorkflowStateTable with optimistic locking.
Safety: Bedrock Guardrails on every model call.
Memory: AgentCore SESSION_SUMMARY, 7-day retention.
Observability: CloudWatch Logs (INFO) + X-Ray traces at 100% sampling.
```

| Agent | Model | Tools |
|---|---|---|
| OrchestratorAgent | Claude Haiku 4.5, temp 0.0 | `initialize_session`, `route_to_inventory_agent`, `route_to_policy_agent`, `route_to_refund_agent`, `route_to_communication_agent` |
| InventoryAgent | Claude Sonnet 4.5, temp 0.1 | `check_order_status`, `get_customer_tier`, `list_customer_orders` |
| PolicyAgent | Claude Sonnet 4.5, temp 0.2 (retrievers 0.0) | `search_all_policies` (fans out to 3 retriever sub-agents) |
| RefundAgent | Claude Sonnet 4.5, temp 0.1 | `get_inventory_context`, `initiate_refund` (30-day Standard, 60-day Premium) |
| CommunicationAgent | Claude Sonnet 4.5, temp 0.3 | `get_full_workflow_context` |

Routing rules: session first, orders go inventory then refund, policy
questions go RAG, account questions go inventory (never RAG), math is
answered directly, communication always writes the final reply.

## Repository map

```text
Nova-Polaris/
  starter/                  Udacity project: agents, infra, tests
    src/agent_orchestrator.py   All implementation (Tasks 2, 3, 4, 6)
    src/agent_utils.py          Terminal trace UI (pre-written, untouched)
    src/agent_observability.py  X-Ray + CloudWatch layer (pre-written, untouched)
    src/bedrock_kb_retrieval.py KB helper (pre-written, untouched)
    infrastructure/           CloudFormation foundation + seed/cleanup scripts
    tests/test_agent.py       Graded suite: task2|task3|task4|task5|task6|all
  terraform/                Production port of the foundation stack
  frontend/                 Next.js ops console (chat, workflow timeline, citations)
  .github/workflows/ci.yml  Lint, credential-free Task 2 suite, console build, tf validate
  submission/               120/120 output, X-Ray map screenshot, trace graph
  PRODUCT.md / DESIGN.md    Brand system and visual tokens
  skills.md                 Skill registry: which skill, when, for what phase
```

Area guides: [starter](starter/README.md) (full task reference),
[terraform](terraform/README.md), [frontend](frontend/README.md),
[submission](submission/README.md).

## Quickstart

Prereqs: Python 3.11+, Node 20+, Terraform 1.9+, AWS CLI with a role
that can use Bedrock models, S3 Vectors, and AgentCore in `us-east-1`.

```bash
# 1. Foundation (CloudFormation path)
aws cloudformation deploy \
  --template-file starter/infrastructure/starter_stack.yaml \
  --stack-name udacity-agentcore \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1

# Terraform path instead (see terraform/README.md):
#   cd terraform && terraform init && terraform plan && terraform apply

# 2. Seed + env
cd starter
python infrastructure/seed_data.py
cp .env.example .env
python config.py            # all resources resolve; KB/Runtime show pending

# 3. Knowledge bases (console): three KBs on Titan Embed v2 over the
#    S3 Vectors bucket, prefixes policies/returns|shipping|warranty,
#    indexes returns|shipping|warranty-policy-index. Sync each,
#    then set RETURNS/SHIPPING/WARRANTY_KB_ID in .env.

# 4. Deploy everything
python src/agent_orchestrator.py deploy
# Copy AGENTCORE_RUNTIME_ARN, GUARDRAIL_ID, GUARDRAIL_VERSION into .env

# 5. Verify
python tests/test_agent.py all        # expect 120/120
python src/agent_orchestrator.py test # 3 live scenarios, prints X-Ray trace IDs
python src/agent_orchestrator.py chat # interactive traced chat
```

## Engineering notes

* **Deterministic routing.** Orchestrator at temperature 0.0; worker
  prompts carry session and customer IDs so agents never ask for known data.
* **No streaming by default.** `BedrockModel(..., streaming=False)` because
  some lab roles grant `Converse` without `ConverseStream`. The deployed
  runtime role has both; flip it back if you prefer streaming.
* **Guardrail topic tuning.** A broad "pricing negotiations" denial makes
  Bedrock's classifier block legitimate discount arithmetic. The topic is
  scoped to threats and demands and verified with `ApplyGuardrail`
  assessments (math passes, haggling blocked). See the NOTE in
  `create_guardrail()`.
* **Optimistic locking.** Every WorkflowState write carries the expected
  version with retries, so concurrent workers cannot clobber each other.
* **CI runs Task 2 with no AWS credentials.** Agent construction and the
  static ThreadPoolExecutor check need no network, so the graph is tested
  on every push.

## Submission evidence

`submission/` holds the 120/120 suite output, the X-Ray Service Map
screenshot (`NovaMart-Orchestrator` to workers to KnowledgeBase nodes),
and the machine-readable trace graph. Resources stay up until cleanup:

```bash
cd starter
python infrastructure/cleanup.py          # dry run
python infrastructure/cleanup.py --yes    # delete everything
```

## License

Follows the starter project license. See `starter/README.md` for the
full task reference and troubleshooting guide.
