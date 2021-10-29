import Router from 'koa-router';
import { familiesList } from './list.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/families' });

  router.get('/', familiesList);

  return router;
};
