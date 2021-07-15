FROM openjdk:11-jdk
RUN groupadd spring && useradd -m spring -g spring
USER spring:spring
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} /src/app/app.jar
ENTRYPOINT ["java","-jar","/src/app/app.jar"]
