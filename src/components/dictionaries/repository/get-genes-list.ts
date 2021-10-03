import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { ListRequest } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { Gene } from '../models.js';

export { getGenesList };

const getGenesList = async (options?: ListRequest, client?: DbClient): Promise<readonly Gene[]> => {
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<Gene>(options, ['name']);

  const text = `SELECT *
                FROM "public"."genes"
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0} OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text });

  return res.rows;
};