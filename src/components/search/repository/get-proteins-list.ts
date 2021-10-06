import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { StringAnyMap } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { ConditionParam, ProteinClient, ProteinRequest, WhereConditionResult } from '../models.js';

export { getProteinsList };

const getProteinsList = async (filters?: ProteinRequest, client?: DbClient): Promise<readonly ProteinClient[]> => {
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<ProteinClient>(filters, [
    'name',
    'alias',
    'length',
    'enzyme',
    'gene',
    'domain',
    'family',
  ]);

  const allowedFilters: ConditionParam[] = [
    { filterName: 'gene', columnName: 'g.id' }, //
    { filterName: 'domain', columnName: 'd.id' },
    { filterName: 'family', columnName: 'f.id' },
  ];

  const { where, values } = createWhereCondition(allowedFilters, filters);

  const text = `SELECT p.*,
                       g."name" as gene,
                       d."name" as domain,
                       f."name" as family
                FROM "public"."proteins" as p
                INNER JOIN "public"."genes" as g ON g."id" = p."geneId"
                INNER JOIN "public"."domains" as d ON d."id" = p."domainId"
                INNER JOIN "public"."families" as f ON f."id" = p."familyId"
                ${where}
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0} OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text, values });

  return res.rows;
};

const createWhereCondition = (allowedFilters: ConditionParam[], filters?: ProteinRequest): WhereConditionResult => {
  const result: WhereConditionResult = { where: '', values: [] };
  if (!filters) return result;

  const values: string[] = filters.term ? [filters.term] : [];
  const conditions: string[] = filters.term ? [`p.name ILIKE '%' || $1 || '%'`] : [];

  allowedFilters.reduce((acc, af) => {
    const arr = (filters as StringAnyMap)?.[af.filterName];
    if (Array.isArray(arr) && arr.length > 0) {
      const condition = createArrayCondition(af.columnName, arr, values);
      acc.push(condition);
    }
    return acc;
  }, conditions);

  if (conditions.length === 0) return result;
  return { where: 'WHERE ' + conditions.join(' AND '), values };
};

const createArrayCondition = (tableColumnName: string, array: readonly string[], values: string[]): string => {
  const expressions: string[] = [];

  array.forEach((id) => {
    values.push(id);
    expressions.push(`$${values.length}`);
  });

  return `${tableColumnName} IN (${expressions.join(',')})`;
};
