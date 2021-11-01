import * as pool from '../../../db/sql-storage/index.js';
import { DbClient } from '../../../db/sql-storage/models.js';
import { Tag } from '../models.js';

export { insertTag };

const insertTag = async (tag: Tag, client?: DbClient): Promise<Tag> => {
  const text = `INSERT INTO "public"."tags"("id", "name")
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING;`;

  const values = [
    tag.id, //
    tag.name,
  ];

  await (client || pool).query({ text, values });

  return tag;
};
