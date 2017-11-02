FROM openjdk:8-jre-alpine

ENV http_proxy="http://proxy-bvcol.admin.ch:8080"
ENV https_proxy="http://proxy-bvcol.admin.ch:8080"

RUN apk add --no-cache ca-certificates wget openssl && update-ca-certificates
RUN wget -O /sentry-agent.x64.so "https://github.com/getsentry/sentry-java/releases/download/v1.5.0/libsentry_agent_linux-x86_64.so"

VOLUME /tmp
ADD build/libs/outstanding-cobra-server-*.jar springApp.jar
RUN sh -c 'touch /springApp.jar'
ENV JAVA_OPTS="-Dspring.profiles.active=production"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -agentpath:/sentry-agent.x64.so -jar /springApp.jar"]