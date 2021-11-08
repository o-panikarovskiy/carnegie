import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Protein } from '../models.js';

export { insertProtein };

const insertProtein = async (protein: Protein, client?: DbClient): Promise<Protein> => {
  const text = `INSERT INTO "public"."proteins"(
                                                "accession",
                                                "uniProtId",
                                                "geneId",
                                                "name",
                                                "description",
                                                "length",
                                                "sequence",
                                                "species",
                                                "func",
                                                "isEnzyme"
                                              )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                ON CONFLICT
                DO UPDATE SET "geneId"        = excluded."geneId",
                              "name"          = excluded."name",
                              "description"   = excluded."description",
                              "length"        = excluded."length",
                              "sequence"      = excluded."sequence",
                              "species"       = excluded."species",
                              "func"          = excluded."func",
                              "isEnzyme"      = excluded."isEnzyme"
                RETURNING *`;

  const values = [
    protein.accession,
    protein.uniProtId,
    protein.geneId,
    protein.name,
    protein.description,
    protein.length,
    protein.sequence,
    protein.species,
    protein.func,
    protein.isEnzyme,
  ];

  const res = await (client || pool).query({ text, values });

  return res.rows[0] as Protein;
};
