# Security Policy

## 🔒 Security Best Practices

This project follows industry-standard security practices. Please review this document carefully.

## 🛡️ Implemented Security Measures

### 1. API Gateway Security

- **Helmet.js** - Security headers protection
- **CORS** - Cross-Origin Resource Sharing configuration
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Body Size Limit** - 10MB maximum payload
- **Input Validation** - All inputs are validated before processing

### 2. Docker Security

- **Non-root user** - All containers run as non-root user (nodejs:1001)
- **Multi-stage builds** - Minimal production images
- **Health checks** - Automatic container health monitoring
- **Read-only filesystem** - Where applicable
- **.dockerignore** - Sensitive files excluded from images

### 3. Microservices Security

- **Error handling** - No stack traces exposed in production
- **Environment variables** - Secrets stored in environment, not code
- **Service isolation** - Each service runs independently
- **Network isolation** - Internal network for service communication

## ⚠️ Security Considerations

### 1. JWT Secrets

**CRITICAL**: Never use the JWT service with weak or default secrets in production.

```typescript
// ❌ BAD - Weak secret
{
  "secret": "secret123"
}

// ✅ GOOD - Strong secret
{
  "secret": "aB9$mK2#pL5@nQ8*rT3!vW6&xY1%zC4^"
}
```

**Recommendations:**

- Use at least 32 characters
- Mix uppercase, lowercase, numbers, and symbols
- Generate with: `openssl rand -base64 32`
- Rotate secrets regularly
- Store in environment variables or secret management system

### 2. Hash Algorithms

**MD5 is NOT secure** for password hashing. It's included only for educational purposes.

```typescript
// ❌ BAD - MD5 for passwords
{
  "algorithm": "md5"
}

// ✅ GOOD - bcrypt for passwords
{
  "algorithm": "bcrypt",
  "rounds": 12
}
```

**Recommendations:**

- Use **bcrypt** for password hashing (already implemented)
- Use at least 10 rounds (12+ recommended)
- SHA-256/SHA-512 for data integrity, not passwords
- Never store plain text passwords

### 3. Input Validation

All user inputs must be validated:

```typescript
// Current validation (basic)
if (!code || !language) {
  throw new Error("Invalid input");
}

// TODO: Add stronger validation
import Joi from "joi";

const schema = Joi.object({
  code: Joi.string().max(1000000).required(),
  language: Joi.string()
    .valid("javascript", "typescript", "python", "json")
    .required(),
});
```

### 4. Environment Variables

**NEVER commit .env files to git**

```bash
# ✅ GOOD - .env in .gitignore
.env
.env.local
.env.*.local

# ❌ BAD - Committing secrets
git add .env  # NEVER DO THIS
```

**Recommendations:**

- Use `.env.example` for templates
- Store production secrets in:
  - AWS Secrets Manager
  - Google Secret Manager
  - Azure Key Vault
  - HashiCorp Vault
  - Docker secrets

### 5. CORS Configuration

Default CORS allows all origins (`*`). **Change in production:**

```typescript
// ❌ BAD - Development default
cors({
  origin: "*",
});

// ✅ GOOD - Production
cors({
  origin: ["https://yourdomain.com", "https://app.yourdomain.com"],
  credentials: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
```

### 6. Rate Limiting

Current rate limit: **100 requests / 15 minutes**

For production, consider:

- Different limits per endpoint
- Stricter limits for expensive operations (formatting, hashing)
- Whitelist for trusted clients
- Redis-based distributed rate limiting

```typescript
// Endpoint-specific rate limiting
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Stricter limit
});

router.post("/expensive-operation", strictLimiter, handler);
```

### 7. Code Injection Prevention

The code formatter executes user input. **Sandboxing recommended:**

```typescript
// TODO: Add sandboxing for code execution
import { VM } from "vm2";

const vm = new VM({
  timeout: 1000,
  sandbox: {},
});
```

## 🚨 Reporting Security Vulnerabilities

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email: security@yourproject.com
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within **48 hours** and provide updates every **7 days**.

## 📋 Security Checklist for Production

### Before Deployment

- [ ] Change all default secrets
- [ ] Configure CORS properly
- [ ] Set up SSL/TLS certificates
- [ ] Enable HTTPS only
- [ ] Review and adjust rate limits
- [ ] Set up logging and monitoring
- [ ] Configure firewall rules
- [ ] Scan Docker images for vulnerabilities
- [ ] Review environment variables
- [ ] Set up secret management system
- [ ] Enable container scanning
- [ ] Configure backup strategy
- [ ] Set up intrusion detection
- [ ] Review API Gateway configuration
- [ ] Enable audit logging
- [ ] Configure network policies (if using K8s)

### Docker Security

```bash
# Scan images for vulnerabilities
docker scan devtools-hub/api-gateway:latest

# Run with security options
docker run --security-opt=no-new-privileges:true \
           --cap-drop=ALL \
           --read-only \
           devtools-hub/api-gateway:latest
```

### Kubernetes Security (if applicable)

```yaml
# Pod Security Policy
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  runAsUser:
    rule: MustRunAsNonRoot
  seLinux:
    rule: RunAsAny
  fsGroup:
    rule: RunAsAny
```

## 🔐 Authentication & Authorization

**Currently NOT implemented**. For production, add:

### 1. API Key Authentication

```typescript
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Invalid API key" },
    });
  }

  next();
};

app.use("/api", apiKeyMiddleware);
```

### 2. OAuth 2.0 / JWT Authentication

```typescript
import { expressjwt } from "express-jwt";

app.use(
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: true,
  }),
);
```

### 3. Service-to-Service Authentication

```typescript
// Add service authentication token
const serviceToken = process.env.SERVICE_TOKEN;

axios.post(url, data, {
  headers: {
    Authorization: `Bearer ${serviceToken}`,
  },
});
```

## 📊 Security Monitoring

### Recommended Tools

1. **SIEM** - Splunk, ELK Stack, Datadog
2. **Vulnerability Scanning** - Snyk, Dependabot, WhiteSource
3. **Container Security** - Aqua Security, Twistlock
4. **API Security** - Kong, Tyk, AWS API Gateway
5. **WAF** - Cloudflare, AWS WAF, ModSecurity

### Monitoring Metrics

```typescript
// Track suspicious activity
- Failed authentication attempts
- Rate limit violations
- Unusual traffic patterns
- Large payload sizes
- Slow response times
- Error rates
```

## 🔄 Security Updates

### Dependencies

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Force fix (may break things)
npm audit fix --force

# Check specific package
npm audit --package=express
```

### Update Schedule

- **Critical vulnerabilities**: Immediate patch
- **High vulnerabilities**: Within 7 days
- **Medium vulnerabilities**: Within 30 days
- **Low vulnerabilities**: Next release cycle
- **Dependencies**: Monthly review

## 📖 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Docker Security](https://docs.docker.com/engine/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## 📞 Contact

For security concerns: security@yourproject.com

---

**Last Updated:** January 30, 2026  
**Version:** 1.0.0
