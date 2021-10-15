import joi from 'joi';
import { Context } from 'koa';
import ms from 'ms';
import { appConfig } from '../../../config/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { authenticateUser } from '../bl/auth-user.js';
import { SignInReq } from '../models.js';

export { signIn };

const schema = joi.object().keys({
  username: joi.string().trim().max(256).required(),
  password: joi.string().trim().max(256).required(),
});

/**
 * @apiGroup Authentication
 * @apiName SignIn
 * @apiVersion 1.0.0
 * @api {post} /auth/SignIn 1. Sign In
 * @apiParam {String{8..256}} email User email
 * @apiParam {String{8..256}} password User password
 * @apiParamExample {json} Request-Example:
 * {
 *   "email": "some@g.com",
 *   "password": "some pwd"
 * }
 * @apiError (400) InvalidRequestModel Invalid request model.
 * @apiSuccess {User} user User model.
 */

const signIn = async (ctx: Context): Promise<void> => {
  const { username, password } = await verifySchema<SignInReq>(schema, ctx.request.body);
  const { sid, user } = await authenticateUser(username, password);

  const { cookieName, expiresIn } = appConfig.auth;
  const secure = appConfig.host.protocol === 'https' ? true : false;
  const expires = new Date(Date.now() + ms(expiresIn));
  ctx.cookies.set(cookieName, sid, { httpOnly: true, secure, expires });

  ctx.body = { user };
};
