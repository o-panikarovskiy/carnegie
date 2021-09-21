import httpStatus from 'http-status-codes';
import { NODE_ENV } from '../../config/index.js';
import { only } from '../../utils/only.js';
import { AppError, IAppError } from '../app-error.js';
import { errorToObject } from './error-to-object.js';

export { parseError };

const isDevelopEnv = NODE_ENV === 'develop' || NODE_ENV === 'local';
const parseError = (e: any): AppError => {
  let error = errorToObject(e);
  error.status = error.status || error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  if (!isDevelopEnv) {
    error = only<IAppError>(error, ['name', 'message', 'code', 'status', 'details', 'desctiption']);
  }

  return error;
};