# flight-reservation-api

A REST API-based flight reservation system built with Spring Boot and PostgreSQL for managing flight ticket bookings.

## Features

- **Ticket Management**: Create, retrieve, and manage flight tickets
- **Search Capabilities**: Filter tickets by booking date, destination, and departure location
- **Database Integration**: PostgreSQL for production, H2 for testing
- **RESTful API**: Clean and intuitive endpoints for all operations
- **Data Validation**: Comprehensive validation for ticket information

## Technology Stack

- **Backend**: Spring Boot 3.5.3
- **Database**: PostgreSQL (production), H2 (testing)
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Gradle
- **Java Version**: 17
- **Additional Libraries**: Lombok for boilerplate reduction

## Getting Started

### Prerequisites

- Java 17 or higher
- PostgreSQL database server
- Gradle (or use included wrapper)

### Database Setup

1. Install PostgreSQL and create a database named `flightdb`
2. Update database credentials in `src/main/resources/application.properties` if needed:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/flightdb
   spring.datasource.username=postgres
   spring.datasource.password=password
   ```

### Running the Application

1. Clone the repository
2. Navigate to the project directory
3. Run the application using Gradle:

   ```bash
   ./gradlew bootRun
   ```

4. The application will start on `http://localhost:8080`

### Running Tests

Execute the test suite with:

```bash
./gradlew test
```

## API Endpoints

### Base URL

```html
http://localhost:8080/api/tickets
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tickets` | Create a new ticket |
| GET | `/api/tickets` | Get all tickets |
| GET | `/api/tickets/by-date?date=YYYY-MM-DD` | Get tickets by booking date |
| GET | `/api/tickets/by-destination?destination=CITY` | Get tickets by destination |
| GET | `/api/tickets/by-kickoff?kickoff=CITY` | Get tickets by departure location |

### Example Usage

#### Create a Ticket

```bash
curl -X POST http://localhost:8080/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "passengerName": "John Doe",
    "destination": "New York",
    "kickoff": "Los Angeles",
    "bookingDate": "2024-01-15"
  }'
```

#### Get All Tickets

```bash
curl http://localhost:8080/api/tickets
```

#### Search by Date

```bash
curl "http://localhost:8080/api/tickets/by-date?date=2024-01-15"
```

## Data Model

### Ticket Entity

```java
{
  "id": Long,
  "passengerName": String,
  "destination": String,
  "kickoff": String,
  "bookingDate": LocalDate
}
```

## Project Structure

```plaintext
src/
├── main/
│   ├── java/com/example/flightreservation/
│   │   ├── controller/          # REST controllers
│   │   ├── entity/              # JPA entities
│   │   ├── repository/          # Data repositories
│   │   ├── service/             # Business logic
│   │   └── config/              # Configuration classes
│   └── resources/
│       ├── application.properties
│       ├── static/
│       └── templates/
└── test/
    └── java/                    # Test classes
```

## Configuration

The application uses PostgreSQL as the primary database. Key configuration properties:

- **Database URL**: `jdbc:postgresql://localhost:5432/flightdb`
- **Server Port**: 8080
- **JPA Settings**: DDL auto-update enabled, SQL logging enabled

## Development

### Building the Project

```bash
./gradlew build
```

### IDE Setup

The project includes configuration for:

- IntelliJ IDEA
- VS Code
- Eclipse/STS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues, please open an issue in the GitHub repository.
