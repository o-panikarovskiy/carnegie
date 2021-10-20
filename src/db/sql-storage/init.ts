import { init as dictionariesInit } from '../../components/dictionaries/index.js';
import { init as searchInit } from '../../components/search/index.js';
import { logger } from '../../log/index.js';
import { connect } from './connect.js';
import { initAppPool } from './pool.js';

export async function init(): Promise<void> {
  initAppPool();

  logger.info('Trying to connect to PostgreSQL...');
  const client = await connect();
  logger.info('PostgreSQL connected.');

  try {
    logger.info('Init database...');
    await client.query(crateCryptoEx());
    await client.query(createShortUID());

    await Promise.all([
      dictionariesInit(client), //
    ]);

    await Promise.all([
      searchInit(client), //
    ]);

    logger.info('Database inited.');
  } finally {
    client.release();
  }
}

function crateCryptoEx() {
  return `CREATE EXTENSION IF NOT EXISTS pgcrypto;`;
}

function createShortUID() {
  return `
    CREATE OR REPLACE FUNCTION gen_short_uid(size INT) RETURNS TEXT AS $$
    DECLARE
      characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      bytes BYTEA := gen_random_bytes(size);
      l INT := length(characters);
      i INT := 0;
      output TEXT := '';
    BEGIN
      WHILE i < size LOOP
        output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
        i := i + 1;
      END LOOP;
      RETURN output;
    END;
    $$ LANGUAGE plpgsql VOLATILE;`;
}
