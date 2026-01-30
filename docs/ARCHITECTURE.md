# Architecture Overview

## System Architecture

Developer Tools Hub follows a microservices architecture pattern with the following components:

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│       API Gateway (3000)        │
│  • Routing                      │
│  • Rate Limiting                │
│  • Request Logging              │
│  • Error Handling               │
└────┬────┬────┬────┬─────────────┘
     │    │    │    │
     ▼    ▼    ▼    ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Formatter│ │  JWT   │ │  Hash  │ │Converter│
│ (3001) │ │ (3002) │ │ (3003) │ │ (3004) │
└────────┘ └────────┘ └────────┘ └────────┘
```

## Design Patterns

### 1. Strategy Pattern

Used for interchangeable algorithms:

**Code Formatter Service:**

- `FormatterStrategy` interface
- `JavaScriptFormatter`, `TypeScriptFormatter`, `JSONFormatter`, `PythonFormatter` implementations

**Hash Service:**

- `HashAlgorithm` interface
- `MD5Hash`, `SHA256Hash`, `SHA512Hash`, `BcryptHash` implementations

**Converter Service:**

- `ConversionStrategy` interface
- `JsonToXmlConverter`, `XmlToJsonConverter`, etc.

```typescript
// Strategy Pattern Example
interface FormatterStrategy {
  format(code: string, options?: any): Promise<string>;
}

class JavaScriptFormatter implements FormatterStrategy {
  async format(code: string, options?: any): Promise<string> {
    // Implementation
  }
}
```

### 2. Factory Pattern

Used for creating strategy instances:

```typescript
class FormatterService {
  private strategies: Map<string, FormatterStrategy>;

  constructor() {
    this.strategies = new Map();
    this.registerStrategies();
  }

  private registerStrategies(): void {
    this.strategies.set("javascript", new JavaScriptFormatter());
    this.strategies.set("typescript", new TypeScriptFormatter());
    // ...
  }

  private getStrategy(language: string): FormatterStrategy {
    const strategy = this.strategies.get(language);
    if (!strategy) {
      throw new Error("Unsupported language");
    }
    return strategy;
  }
}
```

### 3. Singleton Pattern

Used for application instances and loggers:

```typescript
class App {
  private static instance: App;

  private constructor() {
    // Initialization
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }
}
```

### 4. Proxy Pattern

API Gateway acts as a proxy:

```typescript
class ProxyService {
  async forward(path: string, method: Method, data?: any): Promise<any> {
    const response = await this.axiosInstance.request({
      url: path,
      method,
      data,
    });
    return response.data;
  }
}
```

### 5. Middleware Pattern

Express middleware for cross-cutting concerns:

```typescript
// Rate limiting middleware
export const rateLimiter = rateLimit({
  windowMs: 900000,
  max: 100,
});

// Request logging middleware
export const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};
```

## SOLID Principles

### Single Responsibility Principle (SRP)

Each class has one reason to change:

- `FormatterController` - HTTP request handling
- `FormatterService` - Business logic
- `JavaScriptFormatter` - JavaScript formatting logic

### Open/Closed Principle (OCP)

Open for extension, closed for modification:

- New formatters can be added without modifying existing code
- Just implement `FormatterStrategy` and register it

### Liskov Substitution Principle (LSP)

Strategies are interchangeable:

```typescript
const formatter: FormatterStrategy = getStrategy(language);
const result = await formatter.format(code); // Works with any strategy
```

### Interface Segregation Principle (ISP)

Small, focused interfaces:

```typescript
interface FormatterStrategy {
  format(code: string, options?: any): Promise<string>;
}

interface HashAlgorithm {
  hash(data: string, rounds?: number): Promise<string>;
}
```

### Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions:

```typescript
class FormatterService {
  private strategies: Map<string, FormatterStrategy>; // Depends on interface
}
```

## Service Communication

### Synchronous Communication

- API Gateway → Microservices: HTTP/REST
- Uses `axios` for HTTP requests
- Circuit breaker pattern for fault tolerance
- Timeout configuration: 30 seconds

### Error Handling

```typescript
class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any,
  ) {
    super(message);
  }
}
```

## Scalability

### Horizontal Scaling

Each microservice can be scaled independently:

```yaml
# Docker Compose example
code-formatter:
  replicas: 3 # Scale to 3 instances
```

### Load Balancing

Can add nginx or cloud load balancer in front of API Gateway.

### Caching

Can add Redis for caching:

- Formatted code cache
- JWT token cache
- Hash results cache

## Security

### API Gateway Security

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Validate all inputs

### Microservices Security

- **Non-root user** in Docker containers
- **Read-only file system** where possible
- **No secrets in code** - Use environment variables
- **Health checks** - Monitor service health

## Monitoring & Logging

### Logging Strategy

```typescript
class Logger {
  private formatLog(entry: LogEntry): string {
    return `[${timestamp}] [${level}] [${context}] ${message}`;
  }

  info(message: string, metadata?: any): void {
    // Log to console / file / external service
  }
}
```

### Health Checks

Each service exposes `/health` endpoint:

```json
{
  "status": "healthy",
  "service": "code-formatter",
  "timestamp": "2026-01-30T12:00:00.000Z",
  "uptime": 3600.5
}
```

## Deployment

### Docker

Multi-stage builds:

1. **Base stage** - Production dependencies
2. **Build stage** - Compile TypeScript
3. **Production stage** - Minimal runtime image

### Container Orchestration

Docker Compose for local development:

```yaml
services:
  api-gateway:
    depends_on:
      - code-formatter
      - jwt-service
```

For production, consider:

- **Kubernetes** - Container orchestration
- **Docker Swarm** - Simple orchestration
- **Cloud services** - AWS ECS, Google Cloud Run

## Future Enhancements

1. **Service Discovery** - Consul, Eureka
2. **API Gateway** - Kong, Traefik
3. **Message Queue** - RabbitMQ, Kafka
4. **Database** - PostgreSQL, MongoDB
5. **Caching** - Redis
6. **Monitoring** - Prometheus, Grafana
7. **Tracing** - Jaeger, Zipkin
8. **CI/CD** - GitHub Actions, Jenkins
