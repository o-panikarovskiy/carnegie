import joi from 'joi';
import { Context } from 'koa';
import { ListRequest } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { getFamiliesList } from '../repository/get-families-list.js';

const schema = joi.object().keys({
  sort: joi.string().trim().max(50).default('name'),
  skip: joi.number().positive().allow(0).default(0),
  limit: joi.number().positive().min(1).max(1000).default(50),
});

/**
 * @apiGroup Families
 * @apiName GetFamiliesList
 * @apiVersion 1.0.0
 * @api {get} /families?sort=-name&skip=0&limit=100 Get families list
 * @apiParam {String="name", "description"} sort="name" Sort field.
 * Set prefix "-" for desc direction. For example: -name.
 * @apiParam {Number} skip=0 Skip (offset) families
 * @apiParam {Number} limit=50 Max families per page (min 1, max 1000)
 * @apiParamExample {json} Request-Example:
 * {
 *   "sort":"name",
 *   "skip": 0,
 *   "limit": 100
 * }
 * @apiError (400) InvalidRequestModel Invalid request model.
 * @apiSuccess (200) {Family[]} families Families list
 * @apiSuccessExample Success Response:
 * 200 OK
 * {
 *   "families": [
 *     {
 *       "id": "...",
 *       "name": "family 1",
 *       "description": "description 1"
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
export async function familiesList(ctx: Context): Promise<void> {
  const req = await verifySchema<ListRequest>(schema, ctx.request.query);
  const families = await getFamiliesList(req);

  ctx.body = { families };
}
