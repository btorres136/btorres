FROM openjdk:11-jdk
RUN addgroup spring && adduser spring -G spring
USER spring:spring
ARG JAR_FILE=web/target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
