provider "aws" {
  region = var.region
}

module "network" {
  source = "./network"
}

module "database" {
  source   = "./database"
  vpc_id   = module.network.vpc_id
  subnet_ids = module.network.subnet_ids
  db_name = var.db_name
  db_username = var.db_username
  db_password = var.db_password
}

module "backend" {
  source    = "./backend"
  vpc_id    = module.network.vpc_id
  subnet_ids = module.network.subnet_ids
  key_name  = var.key_name
}

module "frontend" {
  source    = "./frontend"
  vpc_id    = module.network.vpc_id
  subnet_ids = module.network.subnet_ids
  key_name  = var.key_name
}