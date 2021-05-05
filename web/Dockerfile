FROM openjdk:11-jdk
RUN groupadd spring && useradd spring -g spring
USER spring:spring
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
