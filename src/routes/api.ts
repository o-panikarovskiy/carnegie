import Router from 'koa-router';
import { createRouter as common } from '../components/common/actions/router.js';
import { createRouter as dicts } from '../components/dictionaries/actions/router.js';
import { createRouter as search } from '../components/search/actions/router.js';

export { api };

const nested: Router[] = [
  common(), //
  dicts(),
  search(),
];

const api = new Router({ prefix: '/api' });
for (const router of nested) {
  api.use(router.routes());
}
