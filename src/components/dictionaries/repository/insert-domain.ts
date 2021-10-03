import * as pool from '../../../db/sql-storage/index.js';
import { DbClient, QueryResult } from '../../../db/sql-storage/models.js';
import { Domain } from '../models.js';

export { insertDomain };

const insertDomain = async (domain: Domain, client?: DbClient): Promise<Domain> => {
  const text = `INSERT INTO "public"."domain"("name")
                VALUES ($1)
                RETURNING *`;

  const values = [domain.name];

  let res: QueryResult;
  res = await (client || pool).query({ text, values });

  return res.rows[0] as Domain;
};
