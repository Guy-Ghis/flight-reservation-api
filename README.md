# flight-reservation-api

A full-stack flight reservation system with a Spring Boot REST API backend and React frontend for managing flight ticket bookings.

## Features

### Frontend (React)

- **Interactive Web Interface**: Modern React-based UI for ticket management
- **Real-time Search**: Filter tickets by booking date, destination, and departure location
- **Responsive Design**: Works on desktop and mobile devices
- **Create Tickets**: User-friendly form for creating new flight tickets
- **Ticket Display**: Grid view of all flight tickets with key information

### Backend (Spring Boot API)

- **RESTful API**: Clean and intuitive endpoints for all operations
- **Database Integration**: PostgreSQL for production, H2 for testing
- **Data Validation**: Comprehensive validation for ticket information
- **CORS Support**: Configured for frontend-backend communication
- **Development Ready**: Includes DevTools for enhanced development experience
- **Testing**: Comprehensive integration tests with H2 in-memory database

### Deployment

- **Containerization**: Docker-ready with Kubernetes deployment configurations
- **Cloud Ready**: Configured for container registry deployment

## Technology Stack

### Frontend

- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.3
- **Development**: Hot Module Replacement (HMR)
- **Linting**: ESLint with React-specific rules
- **Styling**: CSS modules with modern CSS features

### Backend

- **Framework**: Spring Boot 3.5.3
- **Database**: PostgreSQL (production), H2 (testing)
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Gradle
- **Java Version**: 17
- **Additional Libraries**: Lombok for boilerplate reduction
- **Development Tools**: Spring Boot DevTools

### Deployment & Infrastructure

- **Containerization**: Docker & Kubernetes ready
- **Container Registry**: GitHub Container Registry (ghcr.io)
- **Orchestration**: Kubernetes with deployment configurations

## Getting Started

### Prerequisites

#### For Local Development

**Backend:**

- Java 17 or higher
- PostgreSQL database server
- Gradle (or use included wrapper)

**Frontend:**

- Node.js 18 or higher
- npm or yarn package manager

#### For Docker Deployment

- Docker
- Kubernetes cluster (local or cloud)
- kubectl CLI tool

### Database Setup

1. Install PostgreSQL and create a database named `flightdb`
2. Update database credentials in `src/main/resources/application.properties` if needed:

   ```properties
   spring.datasource.url=jdbc:postgresql://postgres:5432/flightdb
   spring.datasource.username=postgres
   spring.datasource.password=password
   ```

   **Note**: The default configuration uses `postgres` as the host for Docker/Kubernetes deployment. For local development, change `postgres` to `localhost`.

### Running the Application

#### Option 1: Local Development

**Backend:**

1. Navigate to the project root directory
2. Run the Spring Boot application:

   ```bash
   ./gradlew bootRun
   ```

3. The backend API will start on `http://localhost:8080`

**Frontend:**

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The frontend will start on `http://localhost:5173`

#### Option 2: Docker/Kubernetes Deployment

**Build the backend:**

```bash
./gradlew build
docker build -t flightreservation .
```

**Deploy to Kubernetes:**

```bash
kubectl apply -f k8s/
```

The application will be available through the Kubernetes service endpoint.

### Running Tests

**Backend Tests:**

```bash
./gradlew test
```

**Frontend Tests:**

```bash
cd frontend
npm run lint
```

Backend tests use H2 in-memory database for isolation and faster execution.

## API Endpoints

### Base URL

**Local Development:**

```html
http://localhost:8080/api/tickets
```

**Kubernetes/Production:**

```html
http://[service-endpoint]/api/tickets
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
├── src/                         # Backend (Spring Boot)
│   ├── main/
│   │   ├── java/com/example/flightreservation/
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── entity/          # JPA entities
│   │   │   ├── repository/      # Data repositories
│   │   │   ├── service/         # Business logic
│   │   │   └── config/          # Configuration classes
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/                # Test classes
├── frontend/                    # Frontend (React)
│   ├── src/
│   │   ├── App.jsx             # Main application component
│   │   ├── App.css             # Application styles
│   │   ├── main.jsx            # React entry point
│   │   └── assets/             # Static assets
│   ├── public/                 # Public assets
│   ├── package.json            # Node.js dependencies
│   └── vite.config.js          # Vite configuration
├── k8s/                        # Kubernetes deployment files
├── build.gradle                # Backend build configuration
└── Dockerfile                  # Container image definition
```

## Configuration

### Backend Configuration

The application uses PostgreSQL as the primary database. Key configuration properties:

#### Production Configuration (`application.properties`)

```properties
spring.application.name=flightreservation
spring.datasource.url=jdbc:postgresql://postgres:5432/flightdb
spring.datasource.username=postgres
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
server.port=8080
```

#### Test Configuration (`application-test.properties`)

```properties
spring.application.name=flightreservation
spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
server.port=8080
```

### Frontend Configuration

The React frontend is configured with Vite and includes:

- **Development Server**: `http://localhost:5173`
- **API Base URL**: Configured in `App.jsx` (currently set to Kubernetes service endpoint)
- **Build Output**: `dist/` directory for production builds
- **Hot Module Replacement**: Enabled for development

**Important Notes:**

- Update the `API_BASE_URL` in `frontend/src/App.jsx` to match your backend deployment:
  - Local development: `http://localhost:8080/api/tickets`
  - Production: Update to match your service endpoint
- The frontend currently expects a `/search` endpoint that is not implemented in the backend. The search functionality uses individual endpoints (`/by-date`, `/by-destination`, `/by-kickoff`) instead.

## Development

### Building the Project

**Backend:**

```bash
./gradlew build
```

**Frontend:**

```bash
cd frontend
npm run build
```

### IDE Setup

The project includes configuration for:

- **VS Code**: Settings in `.vscode/settings.json`
- **IntelliJ IDEA**: Standard Gradle project structure
- **Eclipse/STS**: Standard Gradle project structure

### Development Workflow

1. **Start Backend**: `./gradlew bootRun`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Access Frontend**: `http://localhost:5173`
4. **Access Backend API**: `http://localhost:8080/api/tickets`

### Docker Configuration

The project includes a `Dockerfile` that uses:

- **Base Image**: `eclipse-temurin:17-jre-alpine`
- **Volume**: `/tmp` for temporary files
- **Port**: 8080 (exposed via service configuration)

### Kubernetes Deployment

The `k8s/` directory contains:

- `deployment.yaml` - Application deployment with 2 replicas
- `service.yaml` - Service configuration
- `postgres.yaml` - PostgreSQL database deployment
- `flightreservation-service.yaml` - Application service

**Container Registry**: `ghcr.io/guy-ghis/flightreservation:latest`

## Known Issues & TODO

- [ ] Frontend search functionality expects `/search` endpoint not implemented in backend
- [ ] Frontend API base URL is hardcoded to Kubernetes service endpoint
- [ ] No Docker Compose configuration for easy local development
- [ ] Frontend build process not integrated with backend build

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
