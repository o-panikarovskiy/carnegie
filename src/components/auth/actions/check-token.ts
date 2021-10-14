import httpStatus from 'http-status-codes';
import { Context } from 'koa';

export { checkToken };

const checkToken = async (ctx: Context): Promise<void> => {
  ctx.body = { ok: true };
  ctx.status = httpStatus.OK;
};
