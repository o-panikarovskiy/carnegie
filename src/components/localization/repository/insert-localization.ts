import * as pool from '../../../db/sql-storage/index.js';
import { DbClient, QueryResult } from '../../../db/sql-storage/models.js';
import { Localization } from '../models.js';

export { insertLocalization };

const insertLocalization = async (loc: Localization, client?: DbClient): Promise<Localization> => {
  const text = `INSERT INTO "public"."localization"("proteinId", "organelleId", "pubMedId", "methodId")
                VALUES ($1, $2, $3, $4)
                ON CONFLICT ("proteinId", "organelleId")
                DO UPDATE SET "pubMedId"   = excluded."pubMedId",
                              "methodId"   = excluded."methodId"
                RETURNING *`;

  const values = [
    loc.proteinId, //
    loc.organelleId,
    loc.pubMedId,
    loc.methodId,
  ];

  const res: QueryResult = await (client || pool).query({ text, values });
  return res.rows[0] as Localization;
};
