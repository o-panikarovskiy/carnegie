import Router from 'koa-router';
import { checkApiSessionMiddleware } from '../../auth/index.js';
import { uploadCSV } from './csv.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/upload' });
  router.post('/csv', checkApiSessionMiddleware, uploadCSV);

  return router;
};
