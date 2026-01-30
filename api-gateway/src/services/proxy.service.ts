import axios, { AxiosInstance, Method } from 'axios';
import { AppError } from '../middleware/error.middleware';

/**
 * Proxy Service
 * Forwards requests to microservices
 * Implements Proxy Pattern for service communication
 */
export class ProxyService {
  private axiosInstance: AxiosInstance;
  private serviceUrl: string;

  constructor(serviceUrl: string) {
    this.serviceUrl = serviceUrl;
    this.axiosInstance = axios.create({
      baseURL: serviceUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup axios interceptors for error handling
   */
  private setupInterceptors(): void {
    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response) {
          // Service responded with error
          throw new AppError(
            error.response.status,
            error.response.data?.error?.code || 'SERVICE_ERROR',
            error.response.data?.error?.message || 'Service error occurred',
            error.response.data?.error?.details
          );
        } else if (error.request) {
          // No response received
          throw new AppError(
            503,
            'SERVICE_UNAVAILABLE',
            `Service at ${this.serviceUrl} is unavailable`
          );
        } else {
          // Request setup error
          throw new AppError(
            500,
            'REQUEST_ERROR',
            'Error setting up request to service'
          );
        }
      }
    );
  }

  /**
   * Forward request to microservice
   */
  async forward(
    path: string,
    method: Method = 'GET',
    data?: any,
    headers?: Record<string, string>
  ): Promise<any> {
    try {
      const response = await this.axiosInstance.request({
        url: path,
        method,
        data,
        headers,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
