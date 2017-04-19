pipeline {
    agent { docker 'openjdk:8' }

    stages {
        stage('Prepare') {
            steps {
                sh 'chmod +x gradlew'
                script {
                    configFileProvider([
                            configFile(fileId: '2bc843a4-052f-4a68-9f8a-8b2cb9d2c16c', targetLocation: 'backend/src/main/resources/auth0.yml'),
                            configFile(fileId: '2dcade8f-58b0-4ded-9c56-f2566f084c66', targetLocation: 'backend/src/main/resources/logback-spring.xml')
                    ]){}
                }
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