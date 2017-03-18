FROM openjdk:8-jre-alpine

VOLUME /tmp
ADD build/libs/outstanding-cobra-server-*.jar springApp.jar
RUN sh -c 'touch /springApp.jar'
ENV JAVA_OPTS="-Dspring.profiles.active=production"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /springApp.jar"]