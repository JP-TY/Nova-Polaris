# Outputs mirror the CloudFormation stack exports 1:1, so config.py
# (which reads CloudFormation exports) keeps working when the
# foundation is managed by Terraform. After `terraform apply`,
# either keep the CFN stack for exports or point config at these
# output values.

output "orders_table" {
  value = aws_dynamodb_table.orders.name
}

output "customers_table" {
  value = aws_dynamodb_table.customers.name
}

output "workflow_state_table" {
  value = aws_dynamodb_table.workflow_state.name
}

output "policy_bucket" {
  value = aws_s3_bucket.policy_docs.id
}

output "vector_bucket" {
  value = awscc_s3vectors_vector_bucket.store.vector_bucket_name
}

output "vector_bucket_arn" {
  value = awscc_s3vectors_vector_bucket.store.vector_bucket_arn
}

output "agentcore_role_arn" {
  value = aws_iam_role.agentcore.arn
}

output "agent_log_group" {
  value = aws_cloudwatch_log_group.agent.name
}
