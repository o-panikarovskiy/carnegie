import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { Paper } from '../models.js';

export { getEmptyPapersIds };

const getEmptyPapersIds = async (client?: DbClient): Promise<readonly Paper[]> => {
  const text = `SELECT "id"
                FROM "public"."papers"
                WHERE "title" IS NULL;`;

  const res = await (client || pool).query({ text });

  return res.rows;
};
