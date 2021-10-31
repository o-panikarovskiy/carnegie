import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { ListRequest } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { LocalizationIdVal } from '../models.js';

export { getOrganellesList };

const getOrganellesList = async (options?: ListRequest, client?: DbClient): Promise<readonly LocalizationIdVal[]> => {
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<LocalizationIdVal>(options, ['val']);

  const term = options?.search;
  const where = term ? `WHERE "organelleId" ILIKE $1` : '';
  const values: string[] = term ? [`%${term}%`] : [];

  const text = `SELECT DISTINCT "organelleId" AS "id", "organelleId" AS "val"
                FROM "public"."localization"
                ${where}
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0} OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text, values });

  return res.rows;
};
