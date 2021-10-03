import { DbClient } from '../../../db/sql-storage/models.js';
import { createDomainsTable } from './create-domains-table.js';
import { createFamiliesTable } from './create-familes-table.js';
import { createGenesTable } from './create-genes-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await Promise.all([
    client.query({ text: createGenesTable() }), //
    client.query({ text: createDomainsTable() }),
    client.query({ text: createFamiliesTable() }),
  ]);

  await migrate(client);
};
