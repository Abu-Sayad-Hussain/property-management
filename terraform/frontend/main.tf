resource "aws_instance" "frontend" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux 2 AMI
  instance_type = "t3.micro"
  key_name      = var.key_name
  subnet_id     = element(var.subnet_ids, 1)

  security_groups = [aws_security_group.frontend.id]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y docker
              service docker start
              usermod -a -G docker ec2-user
              yum install -y git
              curl -sL https://rpm.nodesource.com/setup_14.x | bash -
              yum install -y nodejs
              git clone https://github.com/your-username/property-management.git
              cd property-management/frontend
              npm install
              npm run build
              npm start
              EOF

  tags = {
    Name = "Frontend Server"
  }
}

resource "aws_security_group" "frontend" {
  vpc_id = var.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}