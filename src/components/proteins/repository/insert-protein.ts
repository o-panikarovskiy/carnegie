import * as pool from '../../../db/sql-storage/index.js';
import { DbClient, QueryResult } from '../../../db/sql-storage/models.js';
import { NewProtein, Protein } from '../models.js';

export { insertProtein };

const insertProtein = async (protein: NewProtein, client?: DbClient): Promise<Protein> => {
  const text = `INSERT INTO "public"."protein"( "name",
                                                "length",
                                                "geneId",
                                                "domainId",
                                                "familyId",
                                                "alias",
                                                "sequence",
                                                "pubmed",
                                                "biochemicalFn",
                                                "biologicalFn",
                                                "enzyme"
                                              )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *`;

  const values = [
    protein.name, //
    protein.length,
    protein.geneId,
    protein.domainId,
    protein.familyId,
    protein.alias,
    protein.sequence,
    protein.pubmed,
    protein.biochemicalFn,
    protein.biologicalFn,
    protein.enzyme,
  ];

  let res: QueryResult;
  res = await (client || pool).query({ text, values });

  return res.rows[0] as Protein;
};
