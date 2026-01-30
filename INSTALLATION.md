# Installation & Setup Checklist

## ✅ Pre-Installation Check

- [ ] Node.js 18+ установлен (`node --version`)
- [ ] npm установлен (`npm --version`)
- [ ] Docker установлен (опционально) (`docker --version`)
- [ ] Git установлен (`git --version`)

## 📦 Installation Steps

### 1. Install Dependencies

```powershell
# Установка зависимостей для всех сервисов
npm run install:all

# Или по отдельности:
# Корневой проект
npm install

# API Gateway
cd api-gateway
npm install
cd ..

# Code Formatter Service
cd services/code-formatter
npm install
cd ../..

# JWT Service
cd services/jwt-service
npm install
cd ../..

# Hash Service
cd services/hash-service
npm install
cd ../..

# Converter Service
cd services/converter-service
npm install
cd ../..

# Shared libraries
cd shared/common
npm install
cd ../..

cd shared/logger
npm install
cd ../..
```

### 2. Configure Environment

```powershell
# Копировать примеры .env файлов
cp api-gateway/.env.example api-gateway/.env
cp services/code-formatter/.env.example services/code-formatter/.env
cp services/jwt-service/.env.example services/jwt-service/.env
cp services/hash-service/.env.example services/hash-service/.env
cp services/converter-service/.env.example services/converter-service/.env
```

### 3. Build Projects

```powershell
# Собрать все проекты
npm run build

# Или по отдельности для тестирования
cd api-gateway && npm run build && cd ..
cd services/code-formatter && npm run build && cd ../..
cd services/jwt-service && npm run build && cd ../..
cd services/hash-service && npm run build && cd ../..
cd services/converter-service && npm run build && cd ../..
```

### 4. Start Services

#### Option A: Development Mode (recommended for development)

```powershell
# Запустить все сервисы в dev режиме
npm run dev
```

#### Option B: Production Mode

```powershell
# Запустить каждый сервис в отдельном терминале
# Terminal 1 - API Gateway
cd api-gateway
npm start

# Terminal 2 - Code Formatter
cd services/code-formatter
npm start

# Terminal 3 - JWT Service
cd services/jwt-service
npm start

# Terminal 4 - Hash Service
cd services/hash-service
npm start

# Terminal 5 - Converter Service
cd services/converter-service
npm start
```

#### Option C: Docker (easiest)

```powershell
# Собрать и запустить все сервисы
docker-compose up -d

# Или с пересборкой
docker-compose up -d --build
```

## 🧪 Verify Installation

### 1. Check Health Endpoints

```powershell
# API Gateway
curl http://localhost:3000/health

# Code Formatter Service
curl http://localhost:3001/health

# JWT Service
curl http://localhost:3002/health

# Hash Service
curl http://localhost:3003/health

# Converter Service
curl http://localhost:3004/health
```

### 2. Test Each Service

#### Code Formatter

```powershell
curl -X POST http://localhost:3000/api/v1/formatter/format `
  -H "Content-Type: application/json" `
  -d '{"code":"const x={a:1}","language":"javascript"}'
```

#### JWT Service

```powershell
curl -X POST http://localhost:3000/api/v1/jwt/encode `
  -H "Content-Type: application/json" `
  -d '{"payload":{"test":"data"},"secret":"secret123"}'
```

#### Hash Service

```powershell
curl -X POST http://localhost:3000/api/v1/hash/generate `
  -H "Content-Type: application/json" `
  -d '{"data":"password123","algorithm":"sha256"}'
```

#### Converter Service

```powershell
curl -X POST http://localhost:3000/api/v1/converter/convert `
  -H "Content-Type: application/json" `
  -d '{"data":"{\"name\":\"test\"}","from":"json","to":"xml"}'
```

## 🐛 Troubleshooting

### Port Already in Use

```powershell
# Найти процесс, использующий порт
netstat -ano | findstr :3000

# Убить процесс (замените PID на фактический)
taskkill /PID <PID> /F
```

### Dependencies Installation Failed

```powershell
# Очистить кэш npm
npm cache clean --force

# Удалить node_modules и package-lock.json
Remove-Item -Recurse -Force node_modules, package-lock.json
Remove-Item -Recurse -Force api-gateway/node_modules, api-gateway/package-lock.json
Remove-Item -Recurse -Force services/*/node_modules, services/*/package-lock.json

# Установить заново
npm run install:all
```

### Build Errors

```powershell
# Проверить версию TypeScript
npx tsc --version

# Переустановить TypeScript глобально
npm install -g typescript

# Пересобрать проекты
npm run build
```

### Docker Issues

```powershell
# Остановить все контейнеры
docker-compose down

# Удалить все контейнеры и образы
docker-compose down -v
docker system prune -a

# Пересобрать и запустить
docker-compose up -d --build
```

## 📊 Expected Results

После успешной установки вы должны увидеть:

```
✅ API Gateway running on port 3000
✅ Code Formatter Service running on port 3001
✅ JWT Service running on port 3002
✅ Hash Service running on port 3003
✅ Converter Service running on port 3004

All services healthy ✓
```

## 🎉 Next Steps

1. Прочитать [API Documentation](docs/API.md)
2. Попробовать [Examples](docs/EXAMPLES.md)
3. Изучить [Architecture](docs/ARCHITECTURE.md)
4. Настроить для production: [Deployment Guide](docs/DEPLOYMENT.md)

---

## 📝 Notes

- В development режиме логи выводятся в консоль
- В production режиме рекомендуется настроить внешнее логирование
- Для работы с Docker нужны права администратора
- Микросервисы можно запускать независимо друг от друга
