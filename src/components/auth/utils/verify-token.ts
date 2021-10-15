import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { appConfig } from '../../../config/index.js';

export { verifyToken };

const verifyPromise = promisify<string, jwt.Secret, jwt.VerifyOptions>(jwt.verify);
const verifyToken = async (token: string) => {
  return verifyPromise(token, appConfig.auth.tokenSign, {});
};
