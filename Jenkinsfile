def branchSuffix() {
    return env.BRANCH_NAME == 'master' ? '' : '-' + env.BRANCH_NAME.replaceAll(/[0-9A-Za-z-]+/, '-')
}

def fullVersion() {
    return env.VERSION + '.' + env.BUILD_NUMBER + branchSuffix()
}

pipeline {
    agent {
        docker {
            image 'jmesserli/oc-docker-build-container'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v /opt/jenkins-agent/persist/yarn:/root/yarn-cache'
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        VERSION = readFile('VERSION')
    }

    stages {
        stage('Prepare') {
            steps {
                sh 'chmod +x gradlew'
                script {
                    configFileProvider([
                            configFile(fileId: '71d9eae2-4107-4b77-a63b-febab204e5eb', targetLocation: 'backend/src/main/resources/auth.yml'),
                            configFile(fileId: '2dcade8f-58b0-4ded-9c56-f2566f084c66', targetLocation: 'backend/src/main/resources/logback-spring.xml')
                    ]) {}
                }
            }
        }

        stage('Build') {
            steps {
                parallel(
                        "Build Backend": {
                            sh './gradlew clean :backend:assemble :backend:configurationZip --stacktrace --info'
                        },
                        "Build Frontend": {
                            sh './gradlew :frontend:setCacheFolderCI :frontend:assemble --stacktrace --info'
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
            environment {
                CODECOV_TOKEN = credentials('codecov-token')
            }
            steps {
                parallel(
                        "Test Backend": {
                            sh './gradlew :backend:check --stacktrace --info'
                            sh "#!/bin/bash\ncd backend && bash <(curl -s https://codecov.io/bash) -cF backend"
                        },
                        "Test Frontend": {
                            sh './gradlew :frontend:test --stacktrace --info'
                            sh "#!/bin/bash\ncd frontend && bash <(curl -s https://codecov.io/bash) -cF frontend"
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

        stage('Docker & Octopus Release') {
            // when { anyOf { branch 'develop'; branch 'master' } }
            environment {
                DOCKER = credentials('docker-deploy')
                FULL_VERSION = fullVersion()
                OCTOPUS_API_KEY = credentials('octopus-deploy')
            }

            steps {
                sh 'docker login -u "$DOCKER_USR" -p "$DOCKER_PSW" docker.pegnu.cloud:443'

                sh 'docker build -t docker.pegnu.cloud:443/outcobra-backend:$FULL_VERSION -t docker.pegnu.cloud:443/outcobra-backend:latest backend'
                sh 'docker build -t docker.pegnu.cloud:443/outcobra-frontend:$FULL_VERSION -t docker.pegnu.cloud:443/outcobra-frontend:latest frontend'

                sh 'docker push docker.pegnu.cloud:443/outcobra-frontend:$FULL_VERSION && docker push docker.pegnu.cloud:443/outcobra-frontend:latest'
                sh 'docker push docker.pegnu.cloud:443/outcobra-backend:$FULL_VERSION && docker push docker.pegnu.cloud:443/outcobra-backend:latest'

                sh '/opt/octo/Octo push --package backend/build/distributions/outcobra-configuration.$FULL_VERSION.zip --replace-existing --server https://deploy.pegnu.cloud --apiKey $OCTOPUS_API_KEY'
                sh '/opt/octo/Octo create-release --project "Outstanding Cobra" --version $FULL_VERSION --package outcobra-configuration:$FULL_VERSION --package outcobra-frontend:$FULL_VERSION --package outcobra-backend:$FULL_VERSION --package mariadb:10 --server https://deploy.pegnu.cloud --apiKey $OCTOPUS_API_KEY'
            }

            post {
                success {
                    slackSend color: 'good',
                            message: ":rocket: Build #${env.BUILD_NUMBER} successful and released to [Octopus](https://deploy.pegnu.cloud/app#/projects/outstanding-cobra/releases/${env.FULL_VERSION})"
                }

                failure {
                    slackSend color: 'danger',
                            message: ":heavy_exclamation_mark: Releasing #${env.BUILD_NUMBER} (${env.FULL_VERSION}) failed!"
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
