# Terraform — Nova-Polaris foundation infrastructure

Production-grade port of `starter/infrastructure/starter_stack.yaml`.
Provisions the same resources: 3 DynamoDB tables, the S3 policy-docs
bucket, the S3 Vectors bucket + 3 indexes (via the AWSCC provider),
the AgentCore execution role, and the CloudWatch log group.

## Why Terraform alongside CloudFormation?

The graded project reads resource names from CloudFormation exports
(`config.py`), so the CFN stack remains the source of truth for the
submission. This Terraform port is the production-grade path: versioned
state, plan/apply review, and drift detection. Outputs mirror the CFN
export names 1:1.

## Usage

```bash
cd terraform
terraform init
terraform fmt -check
terraform validate
terraform plan -out foundation.tfplan
terraform apply foundation.tfplan
```

`terraform apply` needs the same permissions the stack needs:
Bedrock, DynamoDB, S3, S3 Vectors (`s3vectors:*`), IAM, CloudWatch
Logs, X-Ray, and CloudFormation read access for `config.py`.

Seed data afterwards, exactly as with the CFN stack:

```bash
cd ../starter
python infrastructure/seed_data.py
python config.py
```

## Notes

* Bucket names carry a `random_id` suffix, mirroring the CloudFormation
  stack-id suffix, so repeated applies never collide.
* S3 Vectors resources use the `awscc` provider because the standard
  `aws` provider does not manage vector buckets. If your role lacks
  `s3vectors:*` (like restricted lab roles), `plan` will still succeed
  but `apply` fails on those resources; comment out `vectors.tf` to
  manage the remainder, exactly as the lab fallback does.
* For team use, switch the commented S3 backend in `versions.tf`
  to remote state with locking.
