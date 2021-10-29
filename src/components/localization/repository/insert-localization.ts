import * as pool from '../../../db/sql-storage/index.js';
import { DbClient, QueryResult } from '../../../db/sql-storage/models.js';
import { Localization } from '../models.js';

export { insertLocalization };

const insertLocalization = async (loc: Localization, client?: DbClient): Promise<Localization> => {
  const text = `INSERT INTO "public"."localization"("proteinId", "organelleId", "pubMedId", "method")
                VALUES ($1, $2, $3, $4)
                ON CONFLICT ("proteinId", "organelleId")
                DO UPDATE SET "pubMedId"   = excluded."pubMedId",
                              "method"     = excluded."method"
                RETURNING *`;

  const values = [
    loc.proteinId, //
    loc.organelleId,
    loc.pubMedId,
    loc.method,
  ];

  const res: QueryResult = await (client || pool).query({ text, values });
  return res.rows[0] as Localization;
};
