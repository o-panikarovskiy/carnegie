import { readFileSync } from 'fs';
import { join } from 'path';
import yargs from 'yargs';
import { StringAnyMap } from '../typings/index.js';
import { defaultConfig } from './default.js';
import { AppConfig, NodeEnv } from './typings.js';

export { appConfig, NODE_ENV };

const NODE_ENV: NodeEnv = process.env.NODE_ENV as NodeEnv;

const parseConfig = (): AppConfig => {
  const settings = process.env.SETTINGS;
  const config: Partial<AppConfig> = settings ? JSON.parse(settings) : getConfigJSON();

  return {
    ...defaultConfig, //
    ...config,
  } as AppConfig;
};

const getConfigJSON = (): Partial<AppConfig> => {
  const args = process.argv.slice(2);
  const argv = yargs(args).argv as StringAnyMap;

  const configPath = join(argv.configPath, `${NODE_ENV}.json`);
  const configStr = readFileSync(configPath, 'utf8');

  const config: Partial<AppConfig> = {
    ...JSON.parse(configStr),
    ...argv,
  };

  return config;
};

const appConfig: AppConfig = parseConfig();
