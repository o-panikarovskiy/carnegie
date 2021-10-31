import Router from 'koa-router';
import { methodsList } from './methods.js';
import { organellesList } from './organelles.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/localization' });

  router.get('/methods', methodsList);
  router.get('/organelles', organellesList);

  return router;
};
