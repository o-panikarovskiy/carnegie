import joi from 'joi';
import { Context } from 'koa';
import { ListRequest } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { getProteinsList } from '../repository/get-proteins-list.js';

const schema = joi.object().keys({
  sort: joi.string().trim().max(50).default('name'),
  skip: joi.number().positive().allow(0).default(0),
  limit: joi.number().positive().min(1).max(1000).default(50),
});

/**
 * @apiGroup Proteins
 * @apiName GetProteinsList
 * @apiVersion 1.0.0
 * @api {get} /proteins?sort=-name&skip=0&limit=100 Get proteins list
 * @apiParam {String="name"} sort="name" Sort field.
 * Set prefix "-" for desc direction. For example: -name.
 * @apiParam {Number} skip=0 Skip (offset) proteins
 * @apiParam {Number} limit=50 Max proteins per page (min 1, max 1000)
 * @apiParamExample {json} Request-Example:
 * {
 *   "sort":"name",
 *   "skip": 0,
 *   "limit": 100
 * }
 * @apiError (400) InvalidRequestModel Invalid request model.
 * @apiSuccess (200) {Protein[]} proteins Proteins list
 * @apiSuccessExample Success Response:
 * 200 OK
 * {
 *   "proteins": [
 *     {
 *       "id": "...",
 *       "name": "domain 1"
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
export async function proteinsList(ctx: Context): Promise<void> {
  const req = await verifySchema<ListRequest>(schema, ctx.request.query);
  const proteins = await getProteinsList(req);

  ctx.body = { proteins };
}
