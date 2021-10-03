import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { ListRequest } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { Family } from '../models.js';

export { getFamiliesList };

const getFamiliesList = async (options?: ListRequest, client?: DbClient): Promise<readonly Family[]> => {
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<Family>(options, ['name', 'description']);

  const text = `SELECT *
                FROM "public"."families"
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0} OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text });

  return res.rows;
};
