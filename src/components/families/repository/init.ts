import { DbClient } from '../../../db/sql-storage/models.js';
import { createFamiliesTable } from './create-familes-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await client.query({ text: createFamiliesTable() });
  await migrate(client);
};
