import * as httpContext from 'express-http-context';
import { Logger } from '@nestjs/common';
export class HttpContext {
  get<T>(key: string): T | null {
    try {
      return httpContext.get(key);
    } catch (e) {
      Logger.error(e, 'HttpContext get');
      return null;
    }
  }
  set(key: string, value: any): void {
    try {
      httpContext.set(key, value);
    } catch (e) {
      Logger.error(e, 'HttpContext set');
    }
  }
}
