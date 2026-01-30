# API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

## Common Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": { ... }
  },
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

---

## Code Formatter Service

### Format Code

**Endpoint:** `POST /formatter/format`

**Description:** Format code according to language-specific rules

**Request Body:**

```json
{
  "code": "const x={a:1,b:2};",
  "language": "javascript",
  "options": {
    "semi": true,
    "singleQuote": true
  }
}
```

**Parameters:**

- `code` (string, required) - Source code to format
- `language` (string, required) - Programming language (javascript, typescript, python, json)
- `options` (object, optional) - Formatter-specific options

**Response:**

```json
{
  "success": true,
  "data": {
    "formatted": "const x = { a: 1, b: 2 };\n",
    "language": "javascript",
    "originalLength": 19,
    "formattedLength": 28
  },
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

**Supported Languages:**

- `javascript`, `js` - JavaScript (Prettier)
- `typescript`, `ts` - TypeScript (Prettier)
- `json` - JSON
- `python`, `py` - Python

---

## JWT Service

### Decode JWT Token

**Endpoint:** `POST /jwt/decode`

**Description:** Decode JWT token without verification

**Request Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "header": {
      "alg": "HS256",
      "typ": "JWT"
    },
    "payload": {
      "sub": "1234567890",
      "name": "John Doe",
      "iat": 1516239022
    }
  },
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

### Encode JWT Token

**Endpoint:** `POST /jwt/encode`

**Description:** Create and sign a JWT token

**Request Body:**

```json
{
  "payload": {
    "userId": "123",
    "email": "user@example.com"
  },
  "secret": "your-secret-key",
  "options": {
    "expiresIn": "1h",
    "algorithm": "HS256"
  }
}
```

**Parameters:**

- `payload` (object, required) - Token payload
- `secret` (string, required) - Secret key for signing
- `options` (object, optional) - JWT options (expiresIn, algorithm, etc.)

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

### Verify JWT Token

**Endpoint:** `POST /jwt/verify`

**Description:** Verify JWT token signature and validity

**Request Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "secret": "your-secret-key"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "valid": true,
    "decoded": {
      "userId": "123",
      "email": "user@example.com",
      "iat": 1706616000,
      "exp": 1706619600
    }
  },
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

---

## Hash Generator Service

### Generate Hash

**Endpoint:** `POST /hash/generate`

**Description:** Generate hash using specified algorithm

**Request Body:**

```json
{
  "data": "hello world",
  "algorithm": "sha256",
  "rounds": 10
}
```

**Parameters:**

- `data` (string, required) - Data to hash
- `algorithm` (string, required) - Hash algorithm (md5, sha256, sha512, bcrypt)
- `rounds` (number, optional) - Rounds for bcrypt (default: 10)

**Response:**

```json
{
  "success": true,
  "data": {
    "hash": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
    "algorithm": "sha256",
    "inputLength": 11
  },
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

**Supported Algorithms:**

- `md5` - MD5 (not recommended for security)
- `sha256` - SHA-256
- `sha512` - SHA-512
- `bcrypt` - Bcrypt (with salt)

### Compare Hash

**Endpoint:** `POST /hash/compare`

**Description:** Compare plain text with bcrypt hash

**Request Body:**

```json
{
  "data": "password123",
  "hash": "$2a$10$..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "match": true
  },
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

---

## Converter Service

### Convert Format

**Endpoint:** `POST /converter/convert`

**Description:** Convert between JSON, XML, and YAML formats

**Request Body:**

```json
{
  "data": "{\"name\": \"John\", \"age\": 30}",
  "from": "json",
  "to": "xml",
  "options": {
    "rootName": "person"
  }
}
```

**Parameters:**

- `data` (string, required) - Data to convert
- `from` (string, required) - Source format (json, xml, yaml)
- `to` (string, required) - Target format (json, xml, yaml)
- `options` (object, optional) - Conversion options

**Response:**

```json
{
  "success": true,
  "data": {
    "converted": "<?xml version=\"1.0\"?>\n<person>\n  <name>John</name>\n  <age>30</age>\n</person>",
    "from": "json",
    "to": "xml"
  },
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

**Supported Conversions:**

- `json` → `xml`
- `xml` → `json`
- `json` → `yaml`
- `yaml` → `json`

---

## Health Checks

All services expose a health check endpoint:

**Endpoint:** `GET /health`

**Response:**

```json
{
  "status": "healthy",
  "service": "service-name",
  "timestamp": "2026-01-30T12:00:00.000Z",
  "uptime": 3600.5
}
```

---

## Rate Limiting

API Gateway implements rate limiting:

- **Window:** 15 minutes
- **Max Requests:** 100 per IP

When limit is exceeded:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests from this IP, please try again later."
  },
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

---

## Error Codes

| Code                     | Description                         |
| ------------------------ | ----------------------------------- |
| `VALIDATION_ERROR`       | Invalid request parameters          |
| `UNSUPPORTED_LANGUAGE`   | Language not supported by formatter |
| `UNSUPPORTED_ALGORITHM`  | Hash algorithm not supported        |
| `UNSUPPORTED_CONVERSION` | Format conversion not supported     |
| `FORMATTING_ERROR`       | Code formatting failed              |
| `DECODE_ERROR`           | JWT decoding failed                 |
| `ENCODE_ERROR`           | JWT encoding failed                 |
| `VERIFY_ERROR`           | JWT verification failed             |
| `HASH_ERROR`             | Hash generation failed              |
| `COMPARE_ERROR`          | Hash comparison failed              |
| `CONVERSION_ERROR`       | Format conversion failed            |
| `SERVICE_UNAVAILABLE`    | Microservice is down                |
| `SERVICE_ERROR`          | Microservice returned error         |
| `RATE_LIMIT_EXCEEDED`    | Too many requests                   |
| `INTERNAL_ERROR`         | Internal server error               |
