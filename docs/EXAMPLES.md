# Examples

## Code Formatter Examples

### Format JavaScript

```bash
curl -X POST http://localhost:3000/api/v1/formatter/format \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const x={a:1,b:2};function test(){return x;}",
    "language": "javascript"
  }'
```

### Format TypeScript

```bash
curl -X POST http://localhost:3000/api/v1/formatter/format \
  -H "Content-Type: application/json" \
  -d '{
    "code": "interface User{name:string;age:number}",
    "language": "typescript"
  }'
```

### Format JSON

```bash
curl -X POST http://localhost:3000/api/v1/formatter/format \
  -H "Content-Type: application/json" \
  -d '{
    "code": "{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}",
    "language": "json"
  }'
```

---

## JWT Examples

### Encode JWT

```bash
curl -X POST http://localhost:3000/api/v1/jwt/encode \
  -H "Content-Type: application/json" \
  -d '{
    "payload": {
      "userId": "12345",
      "email": "user@example.com",
      "role": "admin"
    },
    "secret": "my-secret-key",
    "options": {
      "expiresIn": "24h"
    }
  }'
```

### Decode JWT

```bash
curl -X POST http://localhost:3000/api/v1/jwt/decode \
  -H "Content-Type: application/json" \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjYxNjAwMCwiZXhwIjoxNzA2NzAyNDAwfQ.signature"
  }'
```

### Verify JWT

```bash
curl -X POST http://localhost:3000/api/v1/jwt/verify \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your-jwt-token-here",
    "secret": "my-secret-key"
  }'
```

---

## Hash Generator Examples

### Generate SHA-256 Hash

```bash
curl -X POST http://localhost:3000/api/v1/hash/generate \
  -H "Content-Type: application/json" \
  -d '{
    "data": "my-password-123",
    "algorithm": "sha256"
  }'
```

### Generate Bcrypt Hash

```bash
curl -X POST http://localhost:3000/api/v1/hash/generate \
  -H "Content-Type: application/json" \
  -d '{
    "data": "my-password-123",
    "algorithm": "bcrypt",
    "rounds": 12
  }'
```

### Compare Password with Bcrypt Hash

```bash
curl -X POST http://localhost:3000/api/v1/hash/compare \
  -H "Content-Type: application/json" \
  -d '{
    "data": "my-password-123",
    "hash": "$2a$12$abcdefghijklmnopqrstuvwxyz123456789"
  }'
```

---

## Format Converter Examples

### JSON to XML

```bash
curl -X POST http://localhost:3000/api/v1/converter/convert \
  -H "Content-Type: application/json" \
  -d '{
    "data": "{\"person\": {\"name\": \"John\", \"age\": 30, \"city\": \"New York\"}}",
    "from": "json",
    "to": "xml",
    "options": {
      "rootName": "root"
    }
  }'
```

### XML to JSON

```bash
curl -X POST http://localhost:3000/api/v1/converter/convert \
  -H "Content-Type: application/json" \
  -d '{
    "data": "<?xml version=\"1.0\"?><person><name>John</name><age>30</age></person>",
    "from": "xml",
    "to": "json"
  }'
```

### JSON to YAML

```bash
curl -X POST http://localhost:3000/api/v1/converter/convert \
  -H "Content-Type: application/json" \
  -d '{
    "data": "{\"server\": {\"host\": \"localhost\", \"port\": 3000}}",
    "from": "json",
    "to": "yaml"
  }'
```

### YAML to JSON

```bash
curl -X POST http://localhost:3000/api/v1/converter/convert \
  -H "Content-Type: application/json" \
  -d '{
    "data": "server:\n  host: localhost\n  port: 3000",
    "from": "yaml",
    "to": "json"
  }'
```

---

## JavaScript/TypeScript Usage

### Using with Axios

```typescript
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

// Format code
async function formatCode(code: string, language: string) {
  const response = await axios.post(`${API_BASE_URL}/formatter/format`, {
    code,
    language,
  });
  return response.data.data.formatted;
}

// Generate JWT
async function createJWT(payload: object, secret: string) {
  const response = await axios.post(`${API_BASE_URL}/jwt/encode`, {
    payload,
    secret,
    options: { expiresIn: "1h" },
  });
  return response.data.data.token;
}

// Generate hash
async function hashPassword(password: string) {
  const response = await axios.post(`${API_BASE_URL}/hash/generate`, {
    data: password,
    algorithm: "bcrypt",
    rounds: 10,
  });
  return response.data.data.hash;
}

// Convert format
async function convertToXML(jsonData: string) {
  const response = await axios.post(`${API_BASE_URL}/converter/convert`, {
    data: jsonData,
    from: "json",
    to: "xml",
  });
  return response.data.data.converted;
}

// Usage
const formatted = await formatCode("const x={a:1}", "javascript");
const token = await createJWT({ userId: "123" }, "secret");
const hash = await hashPassword("mypassword");
const xml = await convertToXML('{"name":"John"}');
```

### Using with Fetch

```javascript
// Format code
async function formatCode(code, language) {
  const response = await fetch(
    "http://localhost:3000/api/v1/formatter/format",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language }),
    },
  );
  const data = await response.json();
  return data.data.formatted;
}

// Generate hash
async function generateHash(data, algorithm) {
  const response = await fetch("http://localhost:3000/api/v1/hash/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, algorithm }),
  });
  const result = await response.json();
  return result.data.hash;
}
```

---

## Python Usage

```python
import requests
import json

API_BASE_URL = 'http://localhost:3000/api/v1'

# Format code
def format_code(code, language):
    response = requests.post(
        f'{API_BASE_URL}/formatter/format',
        json={'code': code, 'language': language}
    )
    return response.json()['data']['formatted']

# Generate JWT
def create_jwt(payload, secret):
    response = requests.post(
        f'{API_BASE_URL}/jwt/encode',
        json={
            'payload': payload,
            'secret': secret,
            'options': {'expiresIn': '1h'}
        }
    )
    return response.json()['data']['token']

# Generate hash
def hash_password(password):
    response = requests.post(
        f'{API_BASE_URL}/hash/generate',
        json={
            'data': password,
            'algorithm': 'bcrypt',
            'rounds': 10
        }
    )
    return response.json()['data']['hash']

# Usage
formatted_code = format_code('const x={a:1}', 'javascript')
token = create_jwt({'userId': '123'}, 'secret')
password_hash = hash_password('mypassword')
```

---

## Health Check

```bash
# Check API Gateway
curl http://localhost:3000/health

# Check individual services
curl http://localhost:3001/health  # Code Formatter
curl http://localhost:3002/health  # JWT Service
curl http://localhost:3003/health  # Hash Service
curl http://localhost:3004/health  # Converter Service
```
