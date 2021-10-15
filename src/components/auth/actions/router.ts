import Router from 'koa-router';
import { checkToken } from './check-token.js';
import { signIn } from './signin.js';

export { createRouter };

const createRouter = () => {
  const router = new Router({ prefix: '/auth' });

  router.post('/signin', signIn);
  router.get('/check-token', checkToken);

  return router;
};
