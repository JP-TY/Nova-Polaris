variable "project_name" {
  description = "Project prefix for all resource names. Must match PROJECT_NAME in .env and config.py."
  type        = string
  default     = "udacity-agentcore"
}

variable "aws_region" {
  description = "AWS region for all resources. Bedrock AgentCore and S3 Vectors must be available here."
  type        = string
  default     = "us-east-1"
}

variable "log_retention_days" {
  description = "CloudWatch log retention for the agent log group."
  type        = number
  default     = 14
}
