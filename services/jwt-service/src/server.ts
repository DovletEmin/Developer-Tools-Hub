import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { JwtController } from './controllers/jwt.controller';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json({ limit: '10mb' }));

// Controller
const jwtController = new JwtController();

// Routes
app.post('/decode', (req: Request, res: Response) => 
  jwtController.decode(req, res)
);

app.post('/encode', (req: Request, res: Response) => 
  jwtController.encode(req, res)
);

app.post('/verify', (req: Request, res: Response) => 
  jwtController.verify(req, res)
);

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'jwt-service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🔐 JWT Service running on port ${PORT}`);
});
