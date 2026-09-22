# ─────────────────────────────────────────────
# S3 - policy documents (KB data source + deployment artifacts)
# ─────────────────────────────────────────────

data "aws_caller_identity" "current" {}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

resource "aws_s3_bucket" "policy_docs" {
  bucket = "${var.project_name}-policy-docs-${data.aws_caller_identity.current.account_id}-${random_id.bucket_suffix.hex}"
}

resource "aws_s3_bucket_versioning" "policy_docs" {
  bucket = aws_s3_bucket.policy_docs.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "policy_docs" {
  bucket = aws_s3_bucket.policy_docs.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# ─────────────────────────────────────────────
# CloudWatch - agent execution logs
# ─────────────────────────────────────────────

resource "aws_cloudwatch_log_group" "agent" {
  name              = "/aws/bedrock/agentcore/${var.project_name}"
  retention_in_days = var.log_retention_days
}
