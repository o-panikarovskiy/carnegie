import { pool } from './pool.js';

export function stop(): Promise<void> {
  return pool.end();
}
