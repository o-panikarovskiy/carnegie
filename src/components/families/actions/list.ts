import joi from 'joi';
import { Context } from 'koa';
import { ListRequest } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { getFamiliesList } from '../repository/get-families-list.js';

export { familiesList };

const schema = joi.object().keys({
  search: joi.string().trim().max(50).allow('', null),
  sort: joi.string().trim().max(50).default('name'),
  skip: joi.number().positive().allow(0).default(0),
  limit: joi.number().positive().min(1).max(100).default(100),
});

/**
 * @apiGroup Families
 * @apiName GetFamiliesList
 * @api {post} /families/ Get families list
 * @apiParam {string{0..50}} [sort=name] Sort field. Set prefix "-" for change direction. For example: -name.
 * @apiParam {number{0}} [skip=0] Skip (offset) items
 * @apiParam {number{1-100}} [limit=100] Max items per page (min 1, max 100)
 * @apiParam {string{0..50}} [search] Search string
 * @apiParamExample {json} Request-Example:
 * {
 *   "sort":"name",
 *   "skip": 0,
 *   "limit": 100
 * }
 * @apiError (400) InvalidRequestModel Invalid request model.
 * @apiSuccess (200) {Family[]} list Families list
 * @apiSuccessExample Success Response:
 * 200 OK
 * {
 *   "list": [
 *     {
 *       "id": "...",
 *       "name": "family 1"
 *     },
 *     {
 *       ...
 *     },
 *     {
 *       ...
 *     },
 *     ...
 *   ]
 * }
 */
const familiesList = async (ctx: Context): Promise<void> => {
  const req = await verifySchema<ListRequest>(schema, ctx.request.query);
  const list = await getFamiliesList(req);

  ctx.body = { list };
};
