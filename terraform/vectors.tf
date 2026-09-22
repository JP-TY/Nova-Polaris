# ─────────────────────────────────────────────
# S3 Vectors - Knowledge Base backing store (Task 5)
# Uses the AWSCC provider (mirrors CloudFormation), because the
# standard AWS provider does not manage S3 Vectors buckets.
# Settings match Titan Embed Text v2: 1024 dims, cosine,
# AMAZON_BEDROCK_TEXT non-filterable.
# ─────────────────────────────────────────────

resource "awscc_s3vectors_vector_bucket" "store" {
  vector_bucket_name = "${var.project_name}-vectors-${data.aws_caller_identity.current.account_id}-${random_id.bucket_suffix.hex}"
}

resource "awscc_s3vectors_index" "returns" {
  vector_bucket_arn = awscc_s3vectors_vector_bucket.store.vector_bucket_arn
  index_name        = "returns-policy-index"
  data_type         = "float32"
  dimension         = 1024
  distance_metric   = "cosine"
  metadata_configuration = {
    non_filterable_metadata_keys = ["AMAZON_BEDROCK_TEXT"]
  }
}

resource "awscc_s3vectors_index" "shipping" {
  vector_bucket_arn = awscc_s3vectors_vector_bucket.store.vector_bucket_arn
  index_name        = "shipping-policy-index"
  data_type         = "float32"
  dimension         = 1024
  distance_metric   = "cosine"
  metadata_configuration = {
    non_filterable_metadata_keys = ["AMAZON_BEDROCK_TEXT"]
  }
}

resource "awscc_s3vectors_index" "warranty" {
  vector_bucket_arn = awscc_s3vectors_vector_bucket.store.vector_bucket_arn
  index_name        = "warranty-policy-index"
  data_type         = "float32"
  dimension         = 1024
  distance_metric   = "cosine"
  metadata_configuration = {
    non_filterable_metadata_keys = ["AMAZON_BEDROCK_TEXT"]
  }
}
