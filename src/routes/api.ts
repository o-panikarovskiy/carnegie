import Router from 'koa-router';
import { createRouter as auth } from '../components/auth/actions/router.js';
import { createRouter as common } from '../components/common/actions/router.js';
import { createRouter as domains } from '../components/domains/actions/router.js';
import { createRouter as families } from '../components/families/actions/router.js';
import { createRouter as genes } from '../components/genes/actions/router.js';
import { createRouter as localization } from '../components/localization/actions/router.js';
import { createRouter as search } from '../components/proteins/actions/router.js';
import { createRouter as share } from '../components/share/actions/router.js';
import { createRouter as upload } from '../components/upload/actions/router.js';

export { api };

const nested: Router[] = [
  auth(), //
  common(),
  domains(),
  genes(),
  families(),
  search(),
  upload(),
  share(),
  localization(),
];

const api = new Router({ prefix: '/api' });
for (const router of nested) {
  api.use(router.routes());
}
