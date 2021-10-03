import { PoolClient } from 'pg';
import { pool } from './pool.js';

export function connect(): Promise<PoolClient> {
  return pool.connect();
}
