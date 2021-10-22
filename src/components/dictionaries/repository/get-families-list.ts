import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { ListRequest } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { Family } from '../models.js';

export { getFamiliesList };

const getFamiliesList = async (options?: ListRequest, client?: DbClient): Promise<readonly Family[]> => {
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<Family>(options, ['name', 'description']);

  const term = options?.search;
  const where = term ? `WHERE "name" ILIKE $1 OR "description" ILIKE $1` : '';
  const values: string[] = term ? [`%${term}%`] : [];

  const text = `SELECT *
                FROM "public"."families"
                ${where}
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0} OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text, values });

  return res.rows;
};
