# ─────────────────────────────────────────────
# IAM - execution role for the AgentCore Runtime
# (mirrors starter_stack.yaml AgentCoreExecutionRole)
# ─────────────────────────────────────────────

data "aws_iam_policy_document" "agentcore_assume" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["bedrock.amazonaws.com", "bedrock-agentcore.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "agentcore" {
  name               = "${var.project_name}-agentcore-role"
  assume_role_policy = data.aws_iam_policy_document.agentcore_assume.json
}

data "aws_iam_policy_document" "agentcore_project" {
  statement {
    effect = "Allow"
    actions = [
      "bedrock:InvokeModel",
      "bedrock:InvokeModelWithResponseStream",
      "bedrock:ApplyGuardrail",
      "bedrock:GetGuardrail",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "bedrock:Retrieve",
      "bedrock:GetKnowledgeBase",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "cloudformation:ListExports",
      "cloudformation:DescribeStacks",
      "sts:GetCallerIdentity",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:CreateLogDelivery",
      "logs:PutLogEvents",
      "logs:DescribeLogGroups",
      "logs:DescribeLogStreams",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "xray:PutTraceSegments",
      "xray:PutTelemetryRecords",
      "xray:GetSamplingRules",
      "xray:GetSamplingTargets",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "bedrock-agentcore:CreateEvent",
      "bedrock-agentcore:GetEvent",
      "bedrock-agentcore:ListEvents",
      "bedrock-agentcore:GetMemory",
      "bedrock-agentcore:ListMemories",
      "bedrock-agentcore:RetrieveMemoryRecords",
      "bedrock-agentcore:ListMemoryRecords",
      "bedrock-agentcore:GetWorkloadAccessToken",
      "bedrock-agentcore:GetWorkloadAccessTokenForJWT",
      "bedrock-agentcore:GetWorkloadAccessTokenForUserId",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:Query",
      "dynamodb:Scan",
    ]
    resources = [
      aws_dynamodb_table.orders.arn,
      aws_dynamodb_table.customers.arn,
      aws_dynamodb_table.workflow_state.arn,
    ]
  }
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:ListBucket",
    ]
    resources = [
      aws_s3_bucket.policy_docs.arn,
      "${aws_s3_bucket.policy_docs.arn}/*",
    ]
  }
  # Backing store for Bedrock Knowledge Bases (Task 5)
  statement {
    effect    = "Allow"
    actions   = ["s3vectors:*"]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "agentcore_project" {
  name   = "AgentCoreProjectPolicy"
  role   = aws_iam_role.agentcore.id
  policy = data.aws_iam_policy_document.agentcore_project.json
}
