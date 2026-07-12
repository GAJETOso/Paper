# ============================================================================
# Sylvara Platform — Google Cloud reference architecture
# GKE Autopilot + Cloud SQL PostgreSQL + Memorystore Redis
# ============================================================================

terraform {
  required_version = ">= 1.7"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.8"
    }
  }
}

variable "project_id" { type = string }
variable "region" {
  type    = string
  default = "europe-north1"
}
variable "environment" {
  type    = string
  default = "production"
}
variable "db_password" {
  type      = string
  sensitive = true
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_container_cluster" "gke" {
  name             = "sylvara-${var.environment}"
  location         = var.region
  enable_autopilot = true

  release_channel {
    channel = "REGULAR"
  }
}

resource "google_sql_database_instance" "postgres" {
  name             = "sylvara-${var.environment}"
  database_version = "POSTGRES_16"
  region           = var.region

  settings {
    tier = "db-custom-4-16384"
    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = true
      transaction_log_retention_days = 7
    }
    ip_configuration {
      ipv4_enabled = false
    }
  }
  deletion_protection = true
}

resource "google_sql_user" "sylvara" {
  name     = "sylvara"
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}

resource "google_sql_database" "sylvara" {
  name     = "sylvara"
  instance = google_sql_database_instance.postgres.name
}

resource "google_redis_instance" "redis" {
  name           = "sylvara-${var.environment}"
  tier           = "STANDARD_HA"
  memory_size_gb = 4
  region         = var.region
}

output "gke_name"    { value = google_container_cluster.gke.name }
output "db_connection" { value = google_sql_database_instance.postgres.connection_name }
