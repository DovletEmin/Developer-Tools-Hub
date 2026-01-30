# Contributing to Developer Tools Hub

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🎯 Code of Conduct

- Be respectful and inclusive
- Write clean, maintainable code
- Follow the existing code style
- Write tests for new features
- Update documentation as needed

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/developer-tools-hub.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit: `git commit -m "Add: your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Create a Pull Request

## 📝 Coding Standards

### TypeScript Style Guide

- Use TypeScript strict mode
- Follow ESLint rules
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Use async/await over callbacks

### Design Patterns

This project follows several design patterns:

- **Strategy Pattern**: For different implementations (formatters, converters, hash algorithms)
- **Factory Pattern**: For creating strategy instances
- **Singleton Pattern**: For logger and app instances
- **Proxy Pattern**: For service communication
- **Dependency Injection**: For loose coupling

### Project Structure

```
service/
├── src/
│   ├── controllers/     # HTTP request handlers
│   ├── services/        # Business logic
│   ├── strategies/      # Strategy pattern implementations
│   ├── middleware/      # Express middleware
│   ├── config/          # Configuration
│   └── server.ts        # Entry point
├── tests/               # Test files
├── Dockerfile
└── package.json
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linter
npm run lint
```

## 📦 Adding a New Service

1. Create service directory: `services/your-service/`
2. Follow the existing service structure
3. Implement health check endpoint
4. Add Dockerfile
5. Update docker-compose.yml
6. Add routes to API Gateway
7. Update documentation

## 🔧 Adding a New Feature

1. Identify the appropriate service
2. Create strategy interface if needed
3. Implement strategy
4. Register strategy in service
5. Add controller endpoint
6. Write tests
7. Update API documentation

## 📚 Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for code documentation
- Update API.md for new endpoints
- Add examples for new features

## 🐛 Bug Reports

When reporting bugs, include:

- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Error messages/logs

## ✨ Feature Requests

For feature requests, describe:

- Use case
- Proposed solution
- Alternatives considered
- Implementation ideas

## 📋 Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] Commit messages are clear
- [ ] No breaking changes (or documented)
- [ ] Dockerfile updated if needed

## 🔍 Code Review Process

1. PR is submitted
2. Automated tests run
3. Code review by maintainers
4. Address feedback
5. Approval and merge

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
