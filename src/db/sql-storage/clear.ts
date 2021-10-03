import { AppRuntimeError } from '../../errors/app-error.js';
import { poolConfig } from './pool.js';
import { query } from './query.js';

export function clear(): Promise<void> {
  if (poolConfig.database !== 'test') {
    throw new AppRuntimeError('Clear allowed only on test database!');
  }

  return trancatePublicTables();
}

async function trancatePublicTables() {
  const text = `DROP SCHEMA IF EXISTS "public" CASCADE; CREATE SCHEMA IF NOT EXISTS "public";`;
  await query({ text });
}
