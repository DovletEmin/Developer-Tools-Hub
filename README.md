# Developer Tools Hub 🛠️

Modern microservices-based developer tools platform built with clean architecture principles and design patterns.

## 📋 Features

- **Code Formatter Service** - Format code (JavaScript, TypeScript, Python, JSON)
- **JWT Service** - Encode, decode, and validate JWT tokens
- **Hash Generator Service** - Generate hashes (MD5, SHA256, SHA512, bcrypt)
- **Converter Service** - Convert between JSON, XML, and YAML formats

## 🏗️ Architecture

```
developer-tools-hub/
├── api-gateway/          # API Gateway with routing, rate limiting
├── services/
│   ├── code-formatter/   # Code formatting microservice
│   ├── jwt-service/      # JWT operations microservice
│   ├── hash-service/     # Hash generation microservice
│   └── converter-service/# Format conversion microservice
├── shared/
│   ├── common/           # Shared utilities and types
│   ├── logger/           # Centralized logging
│   └── errors/           # Error handling
└── docker-compose.yml    # Container orchestration
```

## 🎯 Design Patterns & Principles

- **SOLID Principles** - Clean, maintainable code
- **Repository Pattern** - Data access abstraction
- **Factory Pattern** - Object creation
- **Strategy Pattern** - Algorithm selection
- **Dependency Injection** - Loose coupling
- **Clean Architecture** - Separation of concerns

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/DovletEmin/Developer-Tools-Hub.git
cd developer-tools-hub

# Install dependencies for all services
npm run install:all

# Start all services with Docker Compose
docker-compose up -d

# Or start in development mode
npm run dev
```

### API Endpoints

**API Gateway**: `http://localhost:3000`

#### Code Formatter

```bash
POST /api/v1/formatter/format
Content-Type: application/json

{
  "code": "const x={a:1,b:2};",
  "language": "javascript"
}
```

#### JWT Service

```bash
POST /api/v1/jwt/decode
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Hash Generator

```bash
POST /api/v1/hash/generate
Content-Type: application/json

{
  "data": "hello world",
  "algorithm": "sha256"
}
```

#### Converter Service

```bash
POST /api/v1/converter/convert
Content-Type: application/json

{
  "data": "{\"name\": \"John\"}",
  "from": "json",
  "to": "xml"
}
```

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 👥 Authors

- Dovlet Eminov

## 🙏 Acknowledgments

Built with modern best practices and clean code principles for the developer community.
