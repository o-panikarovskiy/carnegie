import Router from 'koa-router';
import { helthStatus } from './helth.js';

export { router };

const router = new Router();
router.get('/status', helthStatus);
