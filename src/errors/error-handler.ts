import httpStatus from 'http-status-codes';
import { Context } from 'koa';
import { AppError } from './app-error.js';
import { catchError } from './catch-error.js';
import { APP_RESOURCE_NOT_FOUND } from './common-errors.js';

type ErrorHandler = (ctx: Context, next: () => Promise<unknown>) => Promise<void>;

const errorHandler = (): ErrorHandler => {
  return async (ctx, next) => {
    try {
      await next();
      const status = ctx.status || httpStatus.NOT_FOUND;
      if (status === httpStatus.NOT_FOUND) {
        throw new AppError(APP_RESOURCE_NOT_FOUND);
      }
    } catch (e) {
      catchError(ctx, e);
    }
  };
};

export { errorHandler, ErrorHandler };
