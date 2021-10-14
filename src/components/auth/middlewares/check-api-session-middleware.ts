import { Context } from 'koa';
import { AppError } from '../../../errors/app-error.js';
import { SESSION_REQUIRED } from '../errors.js';
import { takeToken } from '../utils/take-token.js';

export { checkApiSessionMiddleware };

const checkApiSessionMiddleware = async (ctx: Context, next: () => Promise<unknown>): Promise<void> => {
  const token = takeToken(ctx);
  if (!token) throw new AppError(SESSION_REQUIRED);

  // ctx.state.sid = sid;
  // ctx.state.session = session;
  // ctx.state.user = session.user;

  await next();
};
