# Terraform — Cloud Reference Architectures

One module set per cloud; pick your provider directory and supply variables.

| Directory | Stack                                                     |
| --------- | --------------------------------------------------------- |
| `aws/`    | EKS, RDS PostgreSQL 16 (multi-AZ), ElastiCache Redis, S3  |
| `azure/`  | AKS, PostgreSQL Flexible Server, Azure Cache for Redis    |
| `gcp/`    | GKE Autopilot, Cloud SQL PostgreSQL 16, Memorystore Redis |

```bash
cd aws
terraform init
terraform plan -var environment=staging -var db_password=$(openssl rand -base64 24)
terraform apply
```

State should live in a remote backend (S3 + DynamoDB / Azure Storage / GCS) —
uncomment the backend block and configure per environment. Secrets go through
your cloud secret manager, never tfvars committed to git.

After provisioning, deploy the workloads:

```bash
kubectl apply -k ../kubernetes/
```
