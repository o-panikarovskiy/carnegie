import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from 'src/app/typings/common';

export { parseHttpError };

const parseHttpError = (res: HttpErrorResponse) => {
  const {
    name, //
    stack,
    status = res.status,
    code = res.status + '',
    message = res.message || res.statusText,
  } = res.error?.error || {};

  const result: ErrorResponse = { message, status, code, stack, name };
  return result;
};
