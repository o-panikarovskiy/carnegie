import * as pool from '../../../db/sql-storage/index.js';
import { DbClient, QueryResult } from '../../../db/sql-storage/models.js';
import { Domain, NewDomain } from '../models.js';

export { insertDomain };

const insertDomain = async (domain: NewDomain, client?: DbClient): Promise<Domain> => {
  const text = `INSERT INTO "public"."domains"("name")
                VALUES ($1)
                RETURNING *`;

  const values = [domain.name];

  let res: QueryResult;
  res = await (client || pool).query({ text, values });

  return res.rows[0] as Domain;
};
