import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { Family } from '../models.js';

export { findFamilyById, findFamilyByName };

const findFamilyById = async (id: string, client?: DbClient): Promise<Family | null> => {
  const text = `SELECT *
                FROM "public"."families"
                WHERE "id" = $1
                LIMIT 1;`;

  const values = [id];

  const res = await (client || pool).query({ text, values });

  return (res.rows[0] as Family) || null;
};

const findFamilyByName = async (name: string, client?: DbClient): Promise<Family | null> => {
  const text = `SELECT *
                FROM "public"."families"
                WHERE "name" = $1
                LIMIT 1;`;

  const values = [name];

  const res = await (client || pool).query({ text, values });

  return (res.rows[0] as Family) || null;
};
