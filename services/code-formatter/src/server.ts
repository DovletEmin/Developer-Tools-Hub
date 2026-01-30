import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { FormatterController } from './controllers/formatter.controller';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json({ limit: '10mb' }));

// Controller
const formatterController = new FormatterController();

// Routes
app.post('/format', (req: Request, res: Response) => 
  formatterController.format(req, res)
);

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'code-formatter',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`📝 Code Formatter Service running on port ${PORT}`);
});
