/**
 * Common types shared across all microservices
 */

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
  timestamp: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export enum ServiceStatus {
  HEALTHY = 'healthy',
  UNHEALTHY = 'unhealthy',
  DEGRADED = 'degraded',
}

export interface HealthCheck {
  status: ServiceStatus;
  timestamp: string;
  version: string;
  uptime: number;
}

export interface RequestContext {
  requestId: string;
  timestamp: string;
  userId?: string;
  ip?: string;
}
