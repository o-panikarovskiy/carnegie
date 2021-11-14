import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Paper } from '../models.js';

export { insertPaper };

const insertPaper = async (paper: Paper, client?: DbClient): Promise<Paper> => {
  const text = `INSERT INTO "public"."papers"("id", "title", "abstract", "journal", "volume", "year", "startPage")
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                ON CONFLICT ("id")
                DO UPDATE SET "title"      = excluded."title",
                              "abstract"   = excluded."abstract",
                              "journal"    = excluded."journal",
                              "volume"     = excluded."volume",
                              "year"       = excluded."year",
                              "startPage"  = excluded."startPage";`;

  const values = [
    paper.id, //
    paper.title,
    paper.abstract,
    paper.journal,
    paper.volume,
    paper.year,
    paper.startPage,
  ];

  await (client || pool).query({ text, values });

  return paper;
};
