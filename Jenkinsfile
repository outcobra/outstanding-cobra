pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        sh 'chmod +x gradlew'
      }
    }
    stage('Build') {
      steps {
        parallel(
          "Build Backend": {
            sh './gradlew clean :backend:assemble'
            archiveArtifacts 'backend/build/libs/*.jar'
            
          },
          "Build Frontend": {
            sh './gradlew :frontend:assemble'
            
          }
        )
      }
    }
    stage('Test') {
      steps {
        sh './gradlew test'
        junit 'backend/build/test-results/test/*.xml'
      }
    }
    stage('Docker') {
      steps {
        echo 'TODO push to repo'
      }
    }
    stage('Deploy') {
      steps {
        echo 'TODO restart server'
      }
    }
  }
}