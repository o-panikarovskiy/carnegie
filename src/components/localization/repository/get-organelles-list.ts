import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { ListRequest } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { LocalizationOrganelle } from '../models.js';

export { getOrganellesList };

const getOrganellesList = async (options?: ListRequest, client?: DbClient): Promise<readonly LocalizationOrganelle[]> => {
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<LocalizationOrganelle>(options, ['organelle']);

  const term = options?.search;
  const where = term ? `WHERE "organelleId" ILIKE $1` : '';
  const values: string[] = term ? [`%${term}%`] : [];

  const text = `SELECT DISTINCT "organelleId" AS "id", "organelleId" AS "organelle"
                FROM "public"."localization"
                ${where}
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0} OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text, values });

  return res.rows;
};
