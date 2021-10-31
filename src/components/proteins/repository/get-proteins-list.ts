import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { StringAnyMap } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { FiltersSchema, ProteinClient, ProteinRequest } from '../models.js';

export { getProteinsList, ProteinsListResult };

type ProteinsListResult = {
  proteins: readonly ProteinClient[];
  total: number;
};

const allowedSort: (keyof ProteinClient)[] = [
  'uniProtId', //
  'gene',
  'geneId',
  'domain',
  'family',
  'name',
  'description',
  'length',
  'sequence',
  'species',
  'isEnzyme',
  'locMethod',
  'locOrganelleId',
];

const allowedAggFilters: FiltersSchema[] = [
  { filterName: 'locMethod', columnName: 'l."method"' }, //
  { filterName: 'locOrganelle', columnName: 'l."organelleId"' }, //
];

const allowedMainFilters: FiltersSchema[] = [
  { filterName: 'gene', columnName: 'g."accession"' }, //
  { filterName: 'domain', columnName: 'd."id"' },
  { filterName: 'family', columnName: 'f."id"' },
];

const getProteinsList = async (filters?: ProteinRequest, client?: DbClient): Promise<ProteinsListResult> => {
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<ProteinClient>(filters, allowedSort);

  const values: string[] = [];
  const whereAgg = buildWhere(allowedAggFilters, values, [], filters);

  const mainConditions: string[] = [];
  buildMainLike(filters?.term || '', values, mainConditions);
  const whereMain = buildWhere(allowedMainFilters, values, mainConditions, filters);

  const text = `SELECT p.*,
                       g."name" as gene,
                       d."name" as domain,
                       f."name" as family,
                       COUNT(*) OVER() AS total
                FROM (
                  SELECT p.*,
                         STRING_AGG(DISTINCT l."method", '; ') AS "locMethod",
                         STRING_AGG(DISTINCT l."organelleId", '; ') AS "locOrganelleId"
                   FROM "public"."proteins" as p
                   LEFT JOIN "public"."localization" as l ON l."proteinId" = p."uniProtId"
                   ${whereAgg}
                   GROUP BY p."id"
                ) as p
                LEFT JOIN "public"."genes" as g ON g."accession" = p."geneId"
                LEFT JOIN "public"."domains" as d ON d."id" = p."domainId"
                LEFT JOIN "public"."families" as f ON f."id" = p."familyId"
                ${whereMain}
                ORDER BY "${orderBy}" ${orderDirection}
                LIMIT ${limit | 0}
                OFFSET ${skip | 0};`;

  console.log(text);

  const res = await (client || pool).query({ text, values });
  const rows = res.rows;
  const total: number = rows.length > 0 ? Number.parseFloat(rows[0].total) : -1;

  return { proteins: rows, total };
};

const buildMainLike = (term: string, values: string[] = [], conditions: string[] = []) => {
  const len = values.length + 1;
  const like = `(
                  p."name" ILIKE $${len}
              OR  p."uniProtId" ILIKE $${len}
              OR  p."description" ILIKE $${len}
              OR  g."name" ILIKE $${len}
              OR  g."accession" ILIKE $${len}
              OR  d."name" ILIKE $${len}
              OR  f."name" ILIKE $${len}
  )`;

  if (term) {
    values.push(`%${term}%`);
    conditions.push(like);
  }
};

const buildWhere = (schema: FiltersSchema[], values: string[], conditions: string[], filters?: StringAnyMap): string => {
  schema.reduce((acc, af) => {
    const arr = filters?.[af.filterName];
    if (Array.isArray(arr) && arr.length > 0) {
      const condition = buildInArrayCondition(af.columnName, arr, values);
      acc.push(condition);
    }
    return acc;
  }, conditions);

  if (conditions.length === 0) return '';
  return 'WHERE ' + conditions.join(' AND ');
};

const buildInArrayCondition = (tableColumnName: string, array: readonly string[], values: string[]): string => {
  const expressions: string[] = [];

  array.forEach((id) => {
    values.push(id);
    expressions.push(`$${values.length}`);
  });

  return `${tableColumnName} IN (${expressions.join(',')})`;
};
