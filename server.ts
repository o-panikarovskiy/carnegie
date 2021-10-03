import * as http from 'http';
import { app } from './src/app.js';
import { appConfig, NODE_ENV } from './src/config/index.js';
import * as db from './src/db/index.js';
import { catchUncaughtException, catchUnhandledRejection } from './src/errors/index.js';
import { logger } from './src/log/index.js';

const PORT = appConfig.port;

process.on('unhandledRejection', catchUnhandledRejection);
process.on('uncaughtException', catchUncaughtException);

const onAbortSignal = async (server: http.Server) => {
  try {
    await db.stop();
    server.close((e) => process.exit(e ? 1 : 0));
  } catch (error) {
    process.exit(1);
  }
};

const main = async () => {
  if (!NODE_ENV) {
    throw new Error('NODE_ENV not defined!');
  }

  logger.info(`Connect to databases...`);
  await db.init();

  logger.info(`Start web server...`);
  const server = http.createServer(app.callback());
  await new Promise<void>((resolve) => server.listen(PORT, resolve));
  logger.info(`Server started on port ${PORT} in ${NODE_ENV} mode.`);

  process.on('SIGINT', () => onAbortSignal(server));
  return server;
};

main();
