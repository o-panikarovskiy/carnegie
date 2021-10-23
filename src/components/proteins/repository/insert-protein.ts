import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { NewProtein, Protein } from '../models.js';

export { insertProtein };

const insertProtein = async (protein: NewProtein, client?: DbClient): Promise<Protein> => {
  const text = `INSERT INTO "public"."proteins"("uniProtId",
                                                "geneId",
                                                "domainId",
                                                "familyId",
                                                "name",
                                                "description",
                                                "length",
                                                "sequence",
                                                "species",
                                                "isEnzyme"
                                              )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                ON CONFLICT ("uniProtId")
                DO UPDATE SET "geneId"        = excluded."geneId",
                              "domainId"      = excluded."domainId",
                              "familyId"      = excluded."familyId",
                              "name"          = excluded."name",
                              "description"   = excluded."description",
                              "length"        = excluded."length",
                              "sequence"      = excluded."sequence",
                              "species"       = excluded."species",
                              "isEnzyme"      = excluded."isEnzyme"
                RETURNING *`;

  const values = [
    protein.uniProtId,
    protein.geneId,
    protein.domainId,
    protein.familyId,
    protein.name,
    protein.description,
    protein.length,
    protein.sequence,
    protein.species,
    protein.isEnzyme,
  ];

  const res = await (client || pool).query({ text, values });

  return res.rows[0] as Protein;
};
