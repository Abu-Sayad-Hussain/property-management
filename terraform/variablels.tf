variable "region" {
  default = "ap-southeast-1"
}

variable "key_name" {
  description = "The name of the key pair to use for SSH access"
}

variable "db_name" {
  description = "The name of the database"
}

variable "db_username" {
  description = "The username for the database"
}

variable "db_password" {
  description = "The password for the database"
}