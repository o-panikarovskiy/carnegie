import Router from 'koa-router';
import { createRouter as auth } from '../components/auth/actions/router.js';
import { createRouter as common } from '../components/common/actions/router.js';
import { createRouter as dicts } from '../components/dictionaries/actions/router.js';
import { createRouter as search } from '../components/proteins/actions/router.js';
import { createRouter as upload } from '../components/upload/actions/router.js';

export { api };

const nested: Router[] = [
  auth(), //
  common(),
  dicts(),
  search(),
  upload(),
];

const api = new Router({ prefix: '/api' });
for (const router of nested) {
  api.use(router.routes());
}
