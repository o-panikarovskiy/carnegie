import { DbClient } from '../../../db/sql-storage/models.js';
import { createMethodsTable } from './create-methods-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createMethodsTable() });
  await migrate(client);
};
