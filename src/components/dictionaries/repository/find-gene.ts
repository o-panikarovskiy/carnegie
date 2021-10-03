import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { Gene } from '../models.js';

export { findGeneById, findGeneByName };

const findGeneById = async (id: string, client?: DbClient): Promise<Gene | null> => {
  const text = `SELECT *
                FROM "public"."gene"
                WHERE "id" = $1
                LIMIT 1;`;

  const values = [id];

  const res = await (client || pool).query({ text, values });

  return (res.rows[0] as Gene) || null;
};

const findGeneByName = async (name: string, client?: DbClient): Promise<Gene | null> => {
  const text = `SELECT *
                FROM "public"."gene"
                WHERE "name" = $1
                LIMIT 1;`;

  const values = [name];

  const res = await (client || pool).query({ text, values });

  return (res.rows[0] as Gene) || null;
};
