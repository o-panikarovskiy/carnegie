import * as pool from '../../../db/sql-storage/index.js';
import { DbClient, QueryResult } from '../../../db/sql-storage/models.js';
import { Gene, NewGene } from '../models.js';

export { insertGene };

const insertGene = async (gene: NewGene, client?: DbClient): Promise<Gene> => {
  const text = `INSERT INTO "public"."genes"("name", "symbol", "accession")
                VALUES ($1, $2, $3)
                ON CONFLICT ("accession")
                DO UPDATE SET "name"      = excluded."name",
                              "symbol"    = excluded."symbol"
                RETURNING *`;

  const values = [gene.name, gene.symbol, gene.accession];

  const res: QueryResult = await (client || pool).query({ text, values });
  return res.rows[0] as Gene;
};
