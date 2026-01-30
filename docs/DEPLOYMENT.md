# Deployment Guide

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 18+ (for local development)

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/developer-tools-hub.git
cd developer-tools-hub
```

### 2. Install Dependencies

```bash
npm run install:all
```

### 3. Configure Environment Variables

Copy `.env.example` files and configure:

```bash
# API Gateway
cp api-gateway/.env.example api-gateway/.env

# Services
cp services/code-formatter/.env.example services/code-formatter/.env
cp services/jwt-service/.env.example services/jwt-service/.env
cp services/hash-service/.env.example services/hash-service/.env
cp services/converter-service/.env.example services/converter-service/.env
```

### 4. Start in Development Mode

```bash
npm run dev
```

Services will start on:

- API Gateway: http://localhost:3000
- Code Formatter: http://localhost:3001
- JWT Service: http://localhost:3002
- Hash Service: http://localhost:3003
- Converter Service: http://localhost:3004

---

## Docker Deployment

### 1. Build Images

```bash
docker-compose build
```

### 2. Start Services

```bash
docker-compose up -d
```

### 3. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api-gateway
```

### 4. Stop Services

```bash
docker-compose down
```

---

## Production Deployment

### Using Docker Compose

1. **Update environment variables** in `docker-compose.yml`

2. **Build production images:**

```bash
docker-compose -f docker-compose.yml build
```

3. **Deploy:**

```bash
docker-compose -f docker-compose.yml up -d
```

### Using Kubernetes

1. **Create Kubernetes manifests:**

```yaml
# api-gateway-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
    spec:
      containers:
        - name: api-gateway
          image: devtools-hub/api-gateway:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: "production"
---
apiVersion: v1
kind: Service
metadata:
  name: api-gateway
spec:
  selector:
    app: api-gateway
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
```

2. **Deploy to Kubernetes:**

```bash
kubectl apply -f k8s/
```

### AWS Deployment (ECS)

1. **Push images to ECR:**

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

docker tag devtools-hub/api-gateway:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/api-gateway:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/api-gateway:latest
```

2. **Create ECS task definitions and services**

### Google Cloud (Cloud Run)

1. **Build and push to GCR:**

```bash
gcloud builds submit --tag gcr.io/<project-id>/api-gateway

gcloud run deploy api-gateway \
  --image gcr.io/<project-id>/api-gateway \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## Monitoring

### Health Checks

All services expose `/health` endpoints:

```bash
curl http://localhost:3000/health
```

### Docker Health Checks

Health checks are configured in Dockerfiles:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
```

### Prometheus Metrics (Future)

Add Prometheus client to services:

```typescript
import promClient from "prom-client";

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
```

---

## Scaling

### Horizontal Scaling

**Docker Compose:**

```bash
docker-compose up -d --scale code-formatter=3
```

**Kubernetes:**

```bash
kubectl scale deployment code-formatter --replicas=5
```

### Load Balancing

Add nginx load balancer:

```nginx
upstream api_gateway {
    server api-gateway-1:3000;
    server api-gateway-2:3000;
    server api-gateway-3:3000;
}

server {
    listen 80;
    location / {
        proxy_pass http://api_gateway;
    }
}
```

---

## Security

### SSL/TLS

Use Let's Encrypt with nginx:

```bash
certbot --nginx -d api.yourdomain.com
```

### Environment Variables

Never commit secrets. Use:

- Docker secrets
- Kubernetes secrets
- AWS Secrets Manager
- Google Secret Manager

### Firewall Rules

Only expose API Gateway (port 3000) to the internet. Keep microservices internal.

---

## Backup & Recovery

### Database Backup (Future)

If adding database:

```bash
# PostgreSQL
docker exec postgres pg_dump -U user dbname > backup.sql

# MongoDB
docker exec mongo mongodump --out /backup
```

### Disaster Recovery

1. Keep infrastructure as code (Terraform, CloudFormation)
2. Automated backups
3. Multi-region deployment
4. Regular recovery drills

---

## CI/CD

### GitHub Actions Example

```yaml
name: CI/CD

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build images
        run: docker-compose build

      - name: Run tests
        run: npm test

      - name: Push to registry
        run: |
          docker tag devtools-hub/api-gateway:latest registry.example.com/api-gateway:${{ github.sha }}
          docker push registry.example.com/api-gateway:${{ github.sha }}

      - name: Deploy
        run: kubectl set image deployment/api-gateway api-gateway=registry.example.com/api-gateway:${{ github.sha }}
```

---

## Troubleshooting

### Service Not Starting

```bash
# Check logs
docker-compose logs service-name

# Check container status
docker ps -a

# Restart service
docker-compose restart service-name
```

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Network Issues

```bash
# Check network
docker network ls

# Inspect network
docker network inspect devtools-network

# Recreate network
docker-compose down
docker-compose up -d
```
