name: CI/CD Pipeline
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t myapp:latest .
      - name: Login to ECR and push
        uses: aws-actions/amazon-ecr-login@v2
      - name: Deploy to EC2
        run: ssh ec2-user@${{ secrets.EC2_IP }} "docker run -d myapp:latest"
