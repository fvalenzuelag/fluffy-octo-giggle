pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t myapp:latest .'
      }
    }
    stage('Test') {
      steps {
        sh 'docker run myapp:latest npm test'
      }
    }
    stage('Deploy') {
      steps {
        sshagent(['ec2-credentials']) {
          sh 'ssh ec2-user@IP "docker pull myapp:latest && docker run -d myapp:latest"'
        }
      }
    }
  }
}
