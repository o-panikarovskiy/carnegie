import { Query, QueryResult } from './models.js';
import { pool } from './pool.js';

export function query(query: Query): Promise<QueryResult> {
  return pool.query(query);
}
