import { NODE_ENV } from '../config/index.js';
import * as db from '../db/index.js';
import { logger } from '../log/index.js';

(async () => {
  if (NODE_ENV !== 'test') {
    console.error(`NODE_ENV must be set to "test" value`);
    return;
  }

  logger.log(`Run tests`, new Date());

  try {
    await db.clear();
    await db.init();
  } finally {
    await db.stop();
  }

  process.exit(0);
})();
