import * as pool from '../../../db/sql-storage/index.js';
import { DbClient, QueryResult } from '../../../db/sql-storage/models.js';
import { Gene, NewGene } from '../models.js';

export { insertGene };

const insertGene = async (gene: NewGene, client?: DbClient): Promise<Gene> => {
  const text = `INSERT INTO "public"."genes"("name")
                VALUES ($1)
                RETURNING *`;

  const values = [gene.name];

  let res: QueryResult;
  res = await (client || pool).query({ text, values });

  return res.rows[0] as Gene;
};