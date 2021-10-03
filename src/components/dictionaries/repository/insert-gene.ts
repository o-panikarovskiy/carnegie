import * as pool from '../../../db/sql-storage/index.js';
import { DbClient, QueryResult } from '../../../db/sql-storage/models.js';
import { Gene } from '../models.js';

export { insertGene };

const insertGene = async (gene: Gene, client?: DbClient): Promise<Gene> => {
  const text = `INSERT INTO "public"."gene"("name")
                VALUES ($1)
                RETURNING *`;

  const values = [gene.name];

  let res: QueryResult;
  res = await (client || pool).query({ text, values });

  return res.rows[0] as Gene;
};
