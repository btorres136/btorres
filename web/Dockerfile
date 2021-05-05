FROM openjdk:11-jdk
RUN groupadd spring && useradd spring -g spring
RUN ./gradlew build && java -jar build/libs/gs-spring-boot-docker-0.1.0.jar
USER spring:spring
ARG JAR_FILE=web/target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
