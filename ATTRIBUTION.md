# Attributions and Sources

This project builds on the Udacity School of AI Capstone 3.3 (NovaMart)
starter kit. All agent logic in `starter/src/agent_orchestrator.py` was
written for this submission; pre-written helpers were used as-is and are
credited below. External references consulted during development are listed
with their canonical documentation URLs.

## Starter and course material (Udacity)

* Capstone project instructions, architecture diagrams, routing rules, and
  rubric — Udacity classroom, Course 3.3 Capstone Project 3.3 NovaMart.
* `starter/` scaffold: `config.py`, `tests/test_agent.py`,
  `infrastructure/starter_stack.yaml`, `infrastructure/seed_data.py`,
  `infrastructure/cleanup.py`, `src/agent_utils.py` (terminal trace UI),
  `src/agent_observability.py` (X-Ray tracing and CloudWatch logging),
  `src/bedrock_kb_retrieval.py` (KB retrieval helper), `src/demo.py`.
  Used unmodified, as the project requires.

## AWS documentation

* Strands Agents SDK — https://github.com/strands-agents/sdk-python
  (`Agent`, `@tool`, `BedrockModel` configuration, `streaming` option).
* Amazon Bedrock Knowledge Bases — Getting Started —
  https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html
  (S3 data sources, Titan Embed Text v2, `retrieve()` API, ingestion jobs).
* Amazon Bedrock AgentCore Runtime — Developer Guide —
  https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/
  (`create_agent_runtime`, direct code deployment, session memory with
  `summaryMemoryStrategy`, observability with CloudWatch Transaction Search).
* Amazon Bedrock Guardrails —
  https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-create.html
  and the ApplyGuardrail API reference (used to verify topic tuning).
* Amazon S3 Vectors and DynamoDB optimistic locking —
  https://docs.aws.amazon.com/ and
  https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html.
* Optimizing production agents with AgentCore Observability and related
  best-practice guides — https://aws.amazon.com/blogs/machine-learning/
  (sampling, dashboards, memory lifecycle).

## Tooling and libraries

* Boto3 / Botocore — https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
* Terraform AWS and AWSCC providers —
  https://registry.terraform.io/providers/hashicorp/aws and
  https://registry.terraform.io/providers/hashicorp/awscc
  (S3 Vectors resources mirror CloudFormation).
* Next.js and React — https://nextjs.org/docs and https://react.dev
  (ops console scaffold).
* GitHub Actions (`actions/checkout`, `actions/setup-python`,
  `actions/setup-node`, `hashicorp/setup-terraform`) — https://docs.github.com/en/actions.

## Notes on authorship

The multi-agent implementation, guardrail topic tuning, deployment
automation, CI pipeline, Terraform port, ops console, and all
documentation in this repository were produced for this submission.
Library and documentation sources above informed API usage only; no
third-party code is vendored except declared package dependencies.
