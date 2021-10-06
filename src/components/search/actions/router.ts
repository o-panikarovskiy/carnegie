import Router from 'koa-router';
import { proteinsList } from './proteins-list.js';

export function createRouter() {
  const router = new Router({ prefix: '/search' });

  router.post('/proteins', proteinsList);

  return router;
}
