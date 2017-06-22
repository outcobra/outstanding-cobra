pipeline {
    agent {
        docker {
            image 'jmesserli/openjdk-with-docker'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {
        stage('Prepare') {
            steps {
                sh 'chmod +x gradlew'
                script {
                    configFileProvider([
                            configFile(fileId: '2bc843a4-052f-4a68-9f8a-8b2cb9d2c16c', targetLocation: 'backend/src/main/resources/auth0.yml'),
                            configFile(fileId: '2dcade8f-58b0-4ded-9c56-f2566f084c66', targetLocation: 'backend/src/main/resources/logback-spring.xml')
                    ]) {}
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
                failure {
                    slackSend color: 'warning',
                            message: ":negative_squared_cross_mark: Build for ${currentBuild.fullDisplayName} is failing"
                }
            }
        }

        stage('Test') {
            steps {
                parallel(
                        "Test Backend": {
                            sh './gradlew :backend:test --stacktrace --info'
                        },
                        "Test Frontend": {
                            sh './gradlew :frontend:test --stacktrace --info'
                        }
                )
            }

            post {
                always {
                    junit '**/test-results/**/*.xml'
                }

                success {
                    slackSend color: 'good',
                            message: ":heavy_check_mark: Tests for ${currentBuild.fullDisplayName} have passed"
                }

                failure {
                    slackSend color: 'warning',
                            message: ":negative_squared_cross_mark: Tests for ${currentBuild.fullDisplayName} are failing"
                }
            }
        }

        stage('Docker & Deploy') {
            when { anyOf { branch 'develop'; branch 'master' } }
            environment { DOCKER = credentials('docker-deploy') }

            steps {
                sh 'docker login -u "$DOCKER_USR" -p "$DOCKER_PSW" docker.pegnu.cloud:443'

                sh 'docker build -t docker.pegnu.cloud:443/outcobra-backend:$BRANCH_NAME-$BUILD_NUMBER -t docker.pegnu.cloud:443/outcobra-backend:$BRANCH_NAME -t docker.pegnu.cloud:443/outcobra-backend:latest backend'
                sh 'docker build -t docker.pegnu.cloud:443/outcobra-frontend:$BRANCH_NAME-$BUILD_NUMBER -t docker.pegnu.cloud:443/outcobra-frontend:$BRANCH_NAME -t docker.pegnu.cloud:443/outcobra-frontend:latest frontend'

                sh 'docker push docker.pegnu.cloud:443/outcobra-frontend:$BRANCH_NAME && docker push docker.pegnu.cloud:443/outcobra-frontend:latest && docker push docker.pegnu.cloud:443/outcobra-frontend:$BRANCH_NAME-$BUILD_NUMBER'
                sh 'docker push docker.pegnu.cloud:443/outcobra-backend:$BRANCH_NAME && docker push docker.pegnu.cloud:443/outcobra-backend:latest && docker push docker.pegnu.cloud:443/outcobra-backend:$BRANCH_NAME-$BUILD_NUMBER'

                script {
                    configFileProvider([
                            configFile(fileId: '3bfec3c0-2d29-4616-acb6-06d514491d6f', targetLocation: 'known_hosts')
                    ]) {}
                    sshagent(credentials: ['outcobra-deploy-staging-ssh']) {
                        sh 'ssh -o UserKnownHostsFile=known_hosts outcobra-deploy@helios.peg.nu -C "cd /opt/outcobra-a && ./pullRestart.sh"'
                    }
                }
            }

            post {
                success {
                    slackSend color: 'good',
                            message: ":rocket: Shipped #${env.BUILD_NUMBER} to staging environment"
                }

                failure {
                    slackSend color: 'danger',
                            message: ":heavy_exclamation_mark: @jmesserli Deployment for #${env.BUILD_NUMBER} failed!"
                }
            }
        }
    }

    post {
        always {
            deleteDir()
        }
    }
}