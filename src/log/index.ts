import { appConfig } from '../config/index.js';
import { DefaultLogger } from './default.js';
import { ILogger, LogLevel } from './typings.js';

const logger: ILogger = new DefaultLogger(LogLevel[appConfig.logLevel]);
export { logger };
