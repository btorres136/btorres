FROM openjdk:11-jdk
RUN groupadd spring && useradd spring -g spring
USER spring:spring
COPY ./web/build/libs/\*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
