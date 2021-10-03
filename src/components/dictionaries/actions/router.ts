import Router from 'koa-router';
import { domainsList } from './domains-list.js';
import { familiesList } from './families-list.js';
import { genesList } from './genes-list.js';

export function createRouter() {
  const router = new Router({ prefix: '/dicts' });

  router.get('/genes', genesList);
  router.get('/domains', domainsList);
  router.get('/families', familiesList);

  return router;
}
