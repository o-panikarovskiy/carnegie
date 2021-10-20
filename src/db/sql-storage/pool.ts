import pg from 'pg';
import { appConfig, NODE_ENV } from '../../config/index.js';
import { logError } from '../../errors/log-error.js';

export { pool, poolConfig, initAppPool };

let pool: pg.Pool;
let poolConfig: pg.PoolConfig;

const initAppPool = () => {
  poolConfig = appConfig.postreSql;
  if (NODE_ENV === 'test') {
    poolConfig.database = 'test';
  }

  pool = new pg.Pool(poolConfig);
  pool.on('error', (error: Error) => logError(error));
};
