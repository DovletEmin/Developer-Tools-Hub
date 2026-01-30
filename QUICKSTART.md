# Quick Start Guide

Welcome to Developer Tools Hub! This guide will help you get started quickly.

## 🚀 5-Minute Quick Start

### Option 1: Using Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/DovletEmin/Developer-Tools-Hub.git
cd developer-tools-hub

# 2. Start all services
docker-compose up -d

# 3. Wait for services to be ready (~30 seconds)
# Then test the API
curl http://localhost:3000/health
```

That's it! All services are now running.

### Option 2: Local Development

```bash
# 1. Clone the repository
git clone https://github.com/DovletEmin/Developer-Tools-Hub.git
cd developer-tools-hub

# 2. Install dependencies
npm run install:all

# 3. Start in development mode
npm run dev
```

---

## 📋 Verify Installation

### Test Code Formatter

```bash
curl -X POST http://localhost:3000/api/v1/formatter/format \
  -H "Content-Type: application/json" \
  -d '{"code":"const x={a:1}","language":"javascript"}'
```

### Test JWT Service

```bash
curl -X POST http://localhost:3000/api/v1/jwt/encode \
  -H "Content-Type: application/json" \
  -d '{"payload":{"test":"data"},"secret":"secret123"}'
```

### Test Hash Service

```bash
curl -X POST http://localhost:3000/api/v1/hash/generate \
  -H "Content-Type: application/json" \
  -d '{"data":"password","algorithm":"sha256"}'
```

### Test Converter Service

```bash
curl -X POST http://localhost:3000/api/v1/converter/convert \
  -H "Content-Type: application/json" \
  -d '{"data":"{\"name\":\"test\"}","from":"json","to":"xml"}'
```

---

## 🛠️ Available Services

| Service           | Port | Description                           |
| ----------------- | ---- | ------------------------------------- |
| API Gateway       | 3000 | Main entry point                      |
| Code Formatter    | 3001 | Format code (JS, TS, Python, JSON)    |
| JWT Service       | 3002 | JWT encode/decode/verify              |
| Hash Service      | 3003 | Generate hashes (MD5, SHA256, bcrypt) |
| Converter Service | 3004 | Convert JSON/XML/YAML                 |

---

## 📚 Next Steps

1. **Read API Documentation**: See [docs/API.md](docs/API.md)
2. **Try Examples**: See [docs/EXAMPLES.md](docs/EXAMPLES.md)
3. **Learn Architecture**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
4. **Deploy to Production**: See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 🔧 Common Commands

```bash
# Docker
docker-compose up -d          # Start all services
docker-compose down           # Stop all services
docker-compose logs -f        # View logs
docker-compose ps             # Check status
docker-compose restart        # Restart services

# Development
npm run dev                   # Start in dev mode
npm run build                 # Build all services
npm test                      # Run tests
npm run lint                  # Run linter

# Individual Services
cd api-gateway && npm run dev       # Start API Gateway
cd services/code-formatter && npm run dev  # Start Code Formatter
```

---

## ❓ Troubleshooting

### Ports Already in Use

If you get "port already in use" error:

```bash
# On Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Docker Issues

```bash
# Reset Docker
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

### Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove all node_modules
rm -rf node_modules api-gateway/node_modules services/*/node_modules

# Reinstall
npm run install:all
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 🙋 Support

- 📖 Documentation: `/docs` folder
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Happy coding! 🎉**
