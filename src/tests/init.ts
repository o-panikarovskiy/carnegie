import { NODE_ENV } from '../config/index.js';

(async () => {
  if (NODE_ENV !== 'test') {
    console.error(`NODE_ENV must be set to "test" value`);
    return;
  }

  console.log(`Run tests`, new Date());

  // TO DO: clear DB

  process.exit(0);
})();
