import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { StringAnyMap } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { FiltersSchema, ProteinClient, ProteinRequest, WhereConditionResult } from '../models.js';

export { getProteinsList, ProteinsListResult };

type ProteinsListResult = {
  proteins: readonly ProteinClient[];
  total: number;
};

const getProteinsList = async (filters?: ProteinRequest, client?: DbClient): Promise<ProteinsListResult> => {
  const allowedSort: (keyof ProteinClient)[] = [
    'uniProtId',
    'gene',
    'domain',
    'family',
    'name',
    'description',
    'length',
    'sequence',
    'species',
    'isEnzyme',
  ];

  const allowedFilters: FiltersSchema[] = [
    { filterName: 'gene', columnName: 'g.accession' }, //
    { filterName: 'domain', columnName: 'd.id' },
    { filterName: 'family', columnName: 'f.id' },
  ];

  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<ProteinClient>(filters, allowedSort);
  const { where, values } = buildWhere(allowedFilters, filters || {});

  const text = `SELECT p.*,
                       g."name" as gene,
                       d."name" as domain,
                       f."name" as family,
                       COUNT(*) OVER() AS total
                FROM "public"."proteins" as p
                LEFT JOIN "public"."genes" as g ON g."accession" = p."geneId"
                LEFT JOIN "public"."domains" as d ON d."id" = p."domainId"
                LEFT JOIN "public"."families" as f ON f."id" = p."familyId"
                ${where}
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0}
                OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text, values });
  const rows = res.rows;
  const total: number = rows.length > 0 ? Number.parseFloat(rows[0].total) : -1;

  return { proteins: rows, total };
};

const buildWhere = (schema: FiltersSchema[], filters: ProteinRequest): WhereConditionResult => {
  const like = `(
      p."name" ILIKE $1
  OR  p."uniProtId" ILIKE $1
  OR  p."description" ILIKE $1
  OR  g."name" ILIKE $1
  OR  g."accession" ILIKE $1
  OR  d."name" ILIKE $1
  OR  f."name" ILIKE $1
  )`;

  const term = filters.term;
  const values: string[] = term ? [`%${term}%`] : [];
  const conditions: string[] = term ? [like] : [];

  schema.reduce((acc, af) => {
    const arr = (filters as StringAnyMap)?.[af.filterName];
    if (Array.isArray(arr) && arr.length > 0) {
      const condition = buildInArrayCondition(af.columnName, arr, values);
      acc.push(condition);
    }
    return acc;
  }, conditions);

  if (conditions.length === 0) return { where: '', values: [] };
  return { where: 'WHERE ' + conditions.join(' AND '), values };
};

const buildInArrayCondition = (tableColumnName: string, array: readonly string[], values: string[]): string => {
  const expressions: string[] = [];

  array.forEach((id) => {
    values.push(id);
    expressions.push(`$${values.length}`);
  });

  return `${tableColumnName} IN (${expressions.join(',')})`;
};
