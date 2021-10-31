import Router from 'koa-router';
import { methodsList } from './methods.js';
import { organellesList } from './organelles.js';
import { pubMedIdList } from './pub-med-id.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/localization' });

  router.get('/methods', methodsList);
  router.get('/pubmedids', pubMedIdList);
  router.get('/organelles', organellesList);

  return router;
};
