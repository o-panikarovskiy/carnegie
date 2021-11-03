import * as pool from '../../../db/sql-storage/index.js';
import { DbClient, QueryResult } from '../../../db/sql-storage/models.js';
import { Domain, NewDomain } from '../models.js';

export { insertDomain };

const insertDomain = async (domain: NewDomain, client?: DbClient): Promise<Domain> => {
  const text = `INSERT INTO "public"."domains"("name", "interproId", "proteinId")
                VALUES ($1, $2, $3)
                RETURNING *`;

  const values = [
    domain.name, //
    domain.interproId,
    domain.proteinId,
  ];

  const res: QueryResult = await (client || pool).query({ text, values });
  return res.rows[0] as Domain;
};
