import { Secret, sign, SignOptions } from 'jsonwebtoken';
import { promisify } from 'util';
import { appConfig } from '../../../config/index.js';
import { User } from '../models.js';

export { signToken };

const signPromise = promisify<any, Secret, SignOptions>(sign);

const signToken = async (user: User) => {
  return signPromise(user, appConfig.tokenSign, { expiresIn: '7d' });
};
