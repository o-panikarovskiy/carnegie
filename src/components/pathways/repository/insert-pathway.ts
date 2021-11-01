import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Pathway } from '../models.js';

export { insertPathway };

const insertPathway = async (pw: Pathway, client?: DbClient): Promise<Pathway> => {
  const text = `INSERT INTO "public"."pathways"("id", "name")
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING;`;

  const values = [
    pw.id, //
    pw.name,
  ];

  await (client || pool).query({ text, values });

  return pw;
};
