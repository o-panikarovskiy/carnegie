import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { StringAnyMap } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { ColumnsSchema, FiltersSchema, ProteinClient, ProteinRequest, ProteinsListResult, TableColumn } from '../models.js';

export { getProteinsList };

const columnsSchema: readonly ColumnsSchema[] = [
  { columnName: 'id', aliasName: 'p."id"', alwaysInclude: true }, //
  { columnName: 'geneId', aliasName: 'p."geneId"' },
  { columnName: 'geneName', aliasName: 'g."name" AS "geneName"' },
  { columnName: 'domainId', aliasName: 'p."domainId"' },
  { columnName: 'domainName', aliasName: 'd."name" AS "domainName"' },
  { columnName: 'familyId', aliasName: 'p."familyId"' },
  { columnName: 'familyName', aliasName: 'f."name" AS "familyName"' },
  { columnName: 'name', aliasName: 'p."name"', isDefault: true },
  { columnName: 'description', aliasName: 'p."description"' },
  { columnName: 'length', aliasName: 'p."length"' },
  { columnName: 'sequence', aliasName: 'p."sequence"' },
  { columnName: 'species', aliasName: 'p."species"' },
  { columnName: 'isEnzyme', aliasName: 'p."isEnzyme"' },
  { columnName: 'method', aliasName: 'p."method"', isDefault: true },
  { columnName: 'pubMedId', aliasName: 'p."pubMedId"' },
  { columnName: 'organelleId', aliasName: 'p."organelleId"', isDefault: true },
  { columnName: 'geneAliases', aliasName: 'g."geneAliases" AS "geneAliases"' },
  { columnName: 'proteinAliases', aliasName: 'p."proteinAliases"' },
] as const;

const aggFiltersSchema: readonly FiltersSchema[] = [
  { filterName: 'method', columnName: 'loc."methodId"' }, //
  { filterName: 'pubMedId', columnName: 'loc."pubMedId"' },
  { filterName: 'organelleId', columnName: 'loc."organelleId"' },
] as const;

const mainFiltersSchema: readonly FiltersSchema[] = [
  { filterName: 'geneId', columnName: 'g."accession"' }, //
  { filterName: 'domainId', columnName: 'd."id"' },
  { filterName: 'familyId', columnName: 'f."id"' },
] as const;

const getProteinsList = async (req: ProteinRequest, client?: DbClient): Promise<ProteinsListResult> => {
  const columns = filterSelectedColumns(columnsSchema, req.columns);
  const sortColumns = columns.map((c) => c.columnName);
  const selectColumns = columns.map((c) => c.aliasName).join(',\n');
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<ProteinClient>(req, sortColumns);

  const values: string[] = [];
  const whereAgg = buildWhere(aggFiltersSchema, values, [], req);

  const mainConditions: string[] = [];
  buildMainLike(req.term || '', values, mainConditions);
  const whereMain = buildWhere(mainFiltersSchema, values, mainConditions, req);

  const text = `
  SELECT ${selectColumns},
          COUNT(*) OVER() AS total
  FROM (
      SELECT ptn.*,
            STRING_AGG(DISTINCT loc."methodId", '; ') AS "method",
            STRING_AGG(DISTINCT loc."pubMedId", '; ') AS "pubMedId",
            STRING_AGG(DISTINCT loc."organelleId", '; ') AS "organelleId",
            STRING_AGG(DISTINCT tag."name", '; ') AS "proteinAliases"
      FROM "public"."proteins" as ptn
      LEFT JOIN "public"."localization" as loc ON loc."proteinId" = ptn."id"
      LEFT JOIN "public"."tags" as tag ON tag."key" = ptn."id"
      ${whereAgg}
      GROUP BY ptn."id"
  ) as p
  LEFT JOIN (
      SELECT gen.*,
            STRING_AGG(DISTINCT tag."name", '; ') AS "geneAliases"
      FROM "public"."genes" as gen
      LEFT JOIN "public"."tags" as tag ON tag."key" = gen."accession"
      GROUP BY gen."accession"
  ) as g ON g."accession" = p."geneId"
  LEFT JOIN "public"."domains" as d ON d."id" = p."domainId"
  LEFT JOIN "public"."families" as f ON f."id" = p."familyId"
  ${whereMain}
  ORDER BY "${orderBy}" ${orderDirection}
  LIMIT ${limit | 0}
  OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text, values });
  const rows = res.rows;
  const total: number = rows.length > 0 ? Number.parseFloat(rows[0].total) : -1;

  return { proteins: rows, total };
};

const filterSelectedColumns = (schema: readonly ColumnsSchema[], columns: readonly TableColumn[] = []): readonly ColumnsSchema[] => {
  const set = new Set<TableColumn>(columns);
  return schema.filter((s) => s.alwaysInclude || set.has(s.columnName) || (set.size === 0 && s.isDefault));
};

const buildMainLike = (term: string, values: string[] = [], conditions: string[] = []) => {
  const len = values.length + 1;
  const like = `(
                  p."name" ILIKE $${len}
              OR  p."id" ILIKE $${len}
              OR  p."proteinAliases" ILIKE $${len}
              OR  p."description" ILIKE $${len}
              OR  g."name" ILIKE $${len}
              OR  g."geneAliases" ILIKE $${len}
              OR  g."accession" ILIKE $${len}
              OR  d."name" ILIKE $${len}
              OR  f."name" ILIKE $${len}
  )`;

  if (term) {
    values.push(`%${term}%`);
    conditions.push(like);
  }
};

const buildWhere = (schema: readonly FiltersSchema[], values: string[], conditions: string[], filters?: StringAnyMap): string => {
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
