import pg from 'pg';
import { appConfig, NODE_ENV } from '../../config/index.js';
import { logError } from '../../errors/log-error.js';

const poolConfig: pg.PoolConfig = appConfig.postreSql;
if (NODE_ENV === 'test') {
  poolConfig.database = 'test';
}

const pool = new pg.Pool(poolConfig);
pool.on('error', (error: Error) => logError(error));

export { pool, poolConfig };
