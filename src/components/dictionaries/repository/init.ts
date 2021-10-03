import { DbClient } from '../../../db/sql-storage/models.js';
import { createDomainTable } from './create-domain-table.js';
import { createGeneTable } from './create-gene-table.js';
import { migrate } from './migrations/init.js';

export { init };

const init = async (client: DbClient): Promise<void> => {
  await Promise.all([
    client.query({ text: createGeneTable() }), //
    client.query({ text: createDomainTable() }),
  ]);

  await migrate(client);
};
