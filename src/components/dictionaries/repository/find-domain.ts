import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { Domain } from '../models.js';

export { findDomainById, findDomainByName };

const findDomainById = async (id: string, client?: DbClient): Promise<Domain | null> => {
  const text = `SELECT *
                FROM "public"."domain"
                WHERE "id" = $1
                LIMIT 1;`;

  const values = [id];

  const res = await (client || pool).query({ text, values });

  return (res.rows[0] as Domain) || null;
};

const findDomainByName = async (name: string, client?: DbClient): Promise<Domain | null> => {
  const text = `SELECT *
                FROM "public"."domain"
                WHERE "name" = $1
                LIMIT 1;`;

  const values = [name];

  const res = await (client || pool).query({ text, values });

  return (res.rows[0] as Domain) || null;
};
