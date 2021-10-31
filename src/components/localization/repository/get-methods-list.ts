import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { ListRequest } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { LocalizationMethod } from '../models.js';

export { getMethodsList };

const getMethodsList = async (options?: ListRequest, client?: DbClient): Promise<readonly LocalizationMethod[]> => {
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<LocalizationMethod>(options, ['method']);

  const term = options?.search;
  const where = term ? `WHERE "method" ILIKE $1` : '';
  const values: string[] = term ? [`%${term}%`] : [];

  const text = `SELECT DISTINCT "method" AS "id", "method"
                FROM "public"."localization"
                ${where}
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0} OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text, values });

  return res.rows;
};
