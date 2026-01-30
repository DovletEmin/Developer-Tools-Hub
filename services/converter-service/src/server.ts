import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ConverterController } from './controllers/converter.controller';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(express.json({ limit: '10mb' }));

// Controller
const converterController = new ConverterController();

// Routes
app.post('/convert', (req: Request, res: Response) => 
  converterController.convert(req, res)
);

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'converter-service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🔄 Converter Service running on port ${PORT}`);
});
