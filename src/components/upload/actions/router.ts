import Router from 'koa-router';
import { uploadCSV } from './csv.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/upload' });
  router.post('/csv', uploadCSV);

  return router;
};
