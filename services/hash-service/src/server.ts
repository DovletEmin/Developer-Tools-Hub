import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { HashController } from './controllers/hash.controller';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json({ limit: '10mb' }));

// Controller
const hashController = new HashController();

// Routes
app.post('/generate', (req: Request, res: Response) => 
  hashController.generate(req, res)
);

app.post('/compare', (req: Request, res: Response) => 
  hashController.compare(req, res)
);

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'hash-service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🔒 Hash Service running on port ${PORT}`);
});
