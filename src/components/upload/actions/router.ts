import Router from 'koa-router';
import { checkApiSessionMiddleware } from '../../auth/service.js';
import { uploadGenes } from './genes.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/upload' });
  router.post('/genes', checkApiSessionMiddleware, uploadGenes);

  return router;
};
