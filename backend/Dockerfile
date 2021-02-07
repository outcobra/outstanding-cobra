FROM openjdk:11
MAINTAINER outcobra.school
ADD build/libs/outstanding-cobra-server-*.jar /opt/oc/lib/outstanding-cobra-server.jar

ENV TZ=Europe/Zurich
ENV JAVA_OPTS="-Dspring.profiles.active=production"

ENV SPRING_APPLICATION_JSON=''
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENTRYPOINT ["java", "-cp", "-Djava.security.egd=file:/dev/./urandom", "${JAVA_OPTS}"]
CMD ["-jar", "/opt/oc/lib/outstanding-cobra-server.jar"]
