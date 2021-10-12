import httpStatus from 'http-status-codes';
import { IAppError } from './app-error.js';

export const BAD_REQUEST = httpStatus.BAD_REQUEST;
export const NOT_FOUND = httpStatus.NOT_FOUND;
export const FORBIDDEN = httpStatus.FORBIDDEN;
export const NOT_IMPLEMENTED = httpStatus.NOT_IMPLEMENTED;
export const TOO_MANY_REQUESTS = httpStatus.TOO_MANY_REQUESTS;

export const APP_RUNTIME_ERROR: IAppError = {
  message: 'Runtime error.',
  code: 'APPError',
  expose: true,
  status: httpStatus.INTERNAL_SERVER_ERROR,
};

export const APP_NOT_IMPLEMENTED: IAppError = {
  message: 'Not Implemented yet.',
  code: 'NotImplemented',
  status: httpStatus.NOT_IMPLEMENTED,
};

export const APP_RESOURCE_NOT_FOUND: IAppError = {
  message: 'Resource not found.',
  code: 'ResourceNotFound',
  status: httpStatus.NOT_FOUND,
};

export const APP_INVALID_REQ_MODEL: IAppError = {
  message: 'Invalid request model.',
  code: 'InvalidRequestModel',
  status: httpStatus.BAD_REQUEST,
};

export const APP_TOO_MANY_REQUESTS: IAppError = {
  message: 'Too many requests.',
  code: 'RateLimit',
  status: httpStatus.TOO_MANY_REQUESTS,
};

export const APP_ACCESS_DENIED: IAppError = {
  message: 'Access denied.',
  code: 'AccessDenied',
  status: httpStatus.FORBIDDEN,
};

export const SMS_SEND_ERROR: IAppError = {
  message: 'SMS send error',
  code: 'SMSSendError',
  status: httpStatus.BAD_REQUEST,
};

export const EMAIL_SEND_ERROR: IAppError = {
  message: 'Email send error',
  code: 'EmailSendError',
  status: httpStatus.BAD_REQUEST,
};

export const PUSH_NOTIFICATION_ERROR: IAppError = {
  message: 'Puth notification error',
  code: 'PushNotificationError',
  status: httpStatus.BAD_REQUEST,
};
