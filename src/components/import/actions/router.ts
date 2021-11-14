import Router from 'koa-router';
import { checkApiSessionMiddleware } from '../../auth/index.js';
import { uploadCSV } from './upload-csv.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/import' });
  router.post('/csv', checkApiSessionMiddleware, uploadCSV);

  return router;
};
