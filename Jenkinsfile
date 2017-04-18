pipeline {
    agent { docker 'openjdk:8' }

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
                            sh './gradlew clean :backend:assemble --stacktrace --info'
                        },
                        "Build Frontend": {
                            sh './gradlew :frontend:assemble --stacktrace --info'
                        }
                )
            }

            post {
                success {
                    archiveArtifacts 'backend/build/libs/*.jar'
                }
            }
        }

        stage('Test') {
            steps {
                sh './gradlew test --stacktrace --info'
            }

            post {
                always {
                    junit 'backend/build/test-results/test/*.xml'
                }
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