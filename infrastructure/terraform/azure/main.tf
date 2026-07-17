# ============================================================================
# Sylvara Platform — Azure reference architecture
# AKS + Azure Database for PostgreSQL Flexible Server + Azure Cache for Redis
# ============================================================================

terraform {
  required_version = ">= 1.7"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.5"
    }
  }
}

provider "azurerm" {
  features {}
}

variable "location" {
  type    = string
  default = "northeurope"
}

variable "environment" {
  type    = string
  default = "production"
}

variable "db_password" {
  type      = string
  sensitive = true
}

resource "azurerm_resource_group" "platform" {
  name     = "rg-sylvara-${var.environment}"
  location = var.location
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-sylvara-${var.environment}"
  location            = azurerm_resource_group.platform.location
  resource_group_name = azurerm_resource_group.platform.name
  dns_prefix          = "sylvara"

  default_node_pool {
    name                 = "platform"
    vm_size              = "Standard_D4s_v5"
    auto_scaling_enabled = true
    min_count            = 3
    max_count            = 12
  }

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_postgresql_flexible_server" "postgres" {
  name                   = "psql-sylvara-${var.environment}"
  resource_group_name    = azurerm_resource_group.platform.name
  location               = azurerm_resource_group.platform.location
  version                = "16"
  administrator_login    = "sylvara"
  administrator_password = var.db_password
  sku_name               = "GP_Standard_D4s_v3"
  storage_mb             = 262144
  backup_retention_days  = 30
}

resource "azurerm_redis_cache" "redis" {
  name                = "redis-sylvara-${var.environment}"
  location            = azurerm_resource_group.platform.location
  resource_group_name = azurerm_resource_group.platform.name
  capacity            = 1
  family              = "P"
  sku_name            = "Premium"
}

output "aks_name"    { value = azurerm_kubernetes_cluster.aks.name }
output "db_fqdn"     { value = azurerm_postgresql_flexible_server.postgres.fqdn }
