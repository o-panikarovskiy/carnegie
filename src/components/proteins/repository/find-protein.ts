import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { Protein } from '../models.js';

export { findProteinById };

const findProteinById = async (id: string, client?: DbClient): Promise<Protein | null> => {
  const text = `SELECT *
                FROM "public"."proteins"
                WHERE "id" = $1
                LIMIT 1;`;

  const values = [id];

  const res = await (client || pool).query({ text, values });

  return (res.rows[0] as Protein) || null;
};
