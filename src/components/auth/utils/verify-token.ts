import { Secret, verify, VerifyOptions } from 'jsonwebtoken';
import { promisify } from 'util';
import { appConfig } from '../../../config/index.js';

export { verifyToken };

const verifyPromise = promisify<string, Secret, VerifyOptions>(verify);

const verifyToken = async (token: string) => {
  return verifyPromise(token, appConfig.tokenSign, {});
};
