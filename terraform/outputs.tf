output "backend_public_ip" {
  value = module.backend.backend_public_ip
}

output "frontend_public_ip" {
  value = module.frontend.frontend_public_ip
}

output "db_instance_endpoint" {
  value = module.database.db_instance_endpoint
}