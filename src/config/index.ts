import { readFileSync } from 'fs';
import { join } from 'path';
import yargs from 'yargs';
import { AppError } from '../errors/app-error.js';
import { StringAnyMap } from '../typings/index.js';
import { defaultConfig } from './default.js';
import { AppConfig, NodeEnv } from './typings.js';

export { appConfig, initAppConfig, NODE_ENV };

let appConfig: AppConfig;
const NODE_ENV: NodeEnv = process.env.NODE_ENV as NodeEnv;

const initAppConfig = () => {
  appConfig = parseConfig();
};

const parseConfig = (): AppConfig => {
  const settings = process.env.SETTINGS;
  const config: Partial<AppConfig> = settings ? JSON.parse(settings) : getConfigJSON();

  return {
    ...defaultConfig, //
    ...config,
  } as AppConfig;
};

const getConfigJSON = (): Partial<AppConfig> => {
  if (!NODE_ENV) {
    throw new AppError({ message: 'Please, specify NODE_ENV enviroment variable' });
  }

  const args = process.argv.slice(2);
  const argv = yargs(args).argv as StringAnyMap;

  if (!argv.configPath) {
    throw new AppError({ message: 'Please, specify --configPath param' });
  }

  const configPath = join(argv.configPath, `${NODE_ENV}.json`);
  const configStr = readFileSync(configPath, 'utf8');

  const config: Partial<AppConfig> = {
    ...JSON.parse(configStr),
    ...argv,
  };

  return config;
};
