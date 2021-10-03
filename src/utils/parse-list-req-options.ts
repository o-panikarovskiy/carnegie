import { AppError } from '../errors/app-error.js';
import { APP_INVALID_REQ_MODEL } from '../errors/common-errors.js';
import { ListRequest, ParsedListRequest } from '../typings/index.js';

export { parseListReqOptions };

const parseListReqOptions = <T>(
  options?: ListRequest,
  allowedFileds: (keyof T)[] = [],
  defaultLimit = 1000
): ParsedListRequest => {
  let { sort = '', skip = 0, limit = defaultLimit } = options || {};

  let orderBy = sort || (allowedFileds[0] as string);
  let orderDirection: 'ASC' | 'DESC' = 'ASC';

  if (sort && sort[0] === '-') {
    orderBy = sort.slice(1);
    orderDirection = 'DESC';
  }

  if (allowedFileds.length > 0 && !allowedFileds.includes(orderBy as keyof T)) {
    throw new AppError({ ...APP_INVALID_REQ_MODEL, message: 'Invalid sort field.' });
  }

  return { sort, skip, limit, orderBy, orderDirection };
};
