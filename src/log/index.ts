import { appConfig } from '../config/index.js';
import { DefaultLogger } from './default.js';
import { ILogger, LogLevel } from './typings.js';

export { logger, initAppLogger };

let logger: ILogger;

const initAppLogger = () => {
  logger = new DefaultLogger(LogLevel[appConfig.logLevel]);
};
