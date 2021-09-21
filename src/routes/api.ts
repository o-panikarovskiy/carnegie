import Router from 'koa-router';
import { router as common } from '../components/common/actions/router.js';

export { api };

const nested: Router[] = [common];

const api = new Router({ prefix: '/api' });
for (const router of nested) {
  api.use(router.routes());
}
