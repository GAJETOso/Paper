# ============================================================================
# Sylvara Platform — AWS reference architecture
# EKS + RDS PostgreSQL + ElastiCache Redis + S3/CloudFront
# ============================================================================

terraform {
  required_version = ">= 1.7"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.54"
    }
  }
  # Configure remote state per environment:
  # backend "s3" { bucket = "sylvara-tfstate"; key = "platform/aws.tfstate"; region = "eu-west-1" }
}

provider "aws" {
  region = var.region
}

variable "region" {
  type    = string
  default = "eu-west-1"
}

variable "environment" {
  type    = string
  default = "production"
}

variable "db_password" {
  type      = string
  sensitive = true
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 6.6"

  name            = "sylvara-${var.environment}"
  cidr            = "10.40.0.0/16"
  azs             = ["${var.region}a", "${var.region}b", "${var.region}c"]
  private_subnets = ["10.40.1.0/24", "10.40.2.0/24", "10.40.3.0/24"]
  public_subnets  = ["10.40.101.0/24", "10.40.102.0/24", "10.40.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = var.environment != "production"
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.24"

  cluster_name    = "sylvara-${var.environment}"
  cluster_version = "1.31"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  eks_managed_node_groups = {
    platform = {
      instance_types = ["m6i.large"]
      min_size       = 3
      max_size       = 12
      desired_size   = 3
    }
  }
}

resource "aws_db_instance" "postgres" {
  identifier              = "sylvara-${var.environment}"
  engine                  = "postgres"
  engine_version          = "16.4"
  instance_class          = "db.r6g.large"
  allocated_storage       = 200
  storage_encrypted       = true
  db_name                 = "sylvara"
  username                = "sylvara"
  password                = var.db_password
  multi_az                = var.environment == "production"
  backup_retention_period = 30
  deletion_protection     = true
  db_subnet_group_name    = aws_db_subnet_group.postgres.name
}

resource "aws_db_subnet_group" "postgres" {
  name       = "sylvara-${var.environment}"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id      = "sylvara-${var.environment}"
  engine          = "redis"
  node_type       = "cache.r6g.large"
  num_cache_nodes = 1
}

resource "aws_s3_bucket" "assets" {
  bucket = "sylvara-assets-${var.environment}"
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket                  = aws_s3_bucket.assets.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "eks_cluster_name" { value = module.eks.cluster_name }
output "db_endpoint"      { value = aws_db_instance.postgres.endpoint }
