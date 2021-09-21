import { AppConfig, NodeEnv } from './typings.js';

export { appConfig, NODE_ENV };

const NODE_ENV: NodeEnv = process.env.NODE_ENV as NodeEnv;

const appConfig: AppConfig = {
  port: 3000,
  logLevel: 'debug',
};
