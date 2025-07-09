FROM eclipse-temurin:17-jre-alpine
VOLUME /tmp
COPY build/libs/flightreservation-*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
