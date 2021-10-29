import * as pool from '../../../db/sql-storage/index.js';
import { DbClient, QueryResult } from '../../../db/sql-storage/models.js';
import { Family, NewFamily } from '../models.js';

export { insertFamily };

const insertFamily = async (family: NewFamily, client?: DbClient): Promise<Family> => {
  const text = `INSERT INTO "public"."families"("name", "description")
                VALUES ($1, $2)
                RETURNING *`;

  const values = [
    family.name, //
    family.description,
  ];

  const res: QueryResult = await (client || pool).query({ text, values });
  return res.rows[0] as Family;
};
