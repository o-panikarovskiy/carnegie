import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Protein } from '../models.js';

export { insertProtein };

const insertProtein = async (protein: Protein, client?: DbClient): Promise<Protein> => {
  const text = `INSERT INTO "public"."proteins"("id",
                                                "accession",
                                                "geneId",
                                                "familyId",
                                                "name",
                                                "description",
                                                "length",
                                                "sequence",
                                                "species",
                                                "isEnzyme"
                                              )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                ON CONFLICT ("id")
                DO UPDATE SET "geneId"        = excluded."geneId",
                              "familyId"      = excluded."familyId",
                              "name"          = excluded."name",
                              "description"   = excluded."description",
                              "length"        = excluded."length",
                              "sequence"      = excluded."sequence",
                              "species"       = excluded."species",
                              "isEnzyme"      = excluded."isEnzyme"
                RETURNING *`;

  const values = [
    protein.id,
    protein.accession,
    protein.geneId,
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
