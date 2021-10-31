import joi from 'joi';
import { Context } from 'koa';
import { ListRequest } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { getPubMedIdList } from '../repository/get-pub-med-id-list.js';

export { pubMedIdList };

const schema = joi.object().keys({
  search: joi.string().trim().max(50).allow('', null),
  sort: joi.string().trim().max(50).default('val'),
  skip: joi.number().positive().allow(0).default(0),
  limit: joi.number().positive().min(1).max(1000).default(50),
});

/**
 * @apiGroup Localization
 * @apiName GetPubMedIdList
 * @apiVersion 1.0.0
 * @api {get} /pubMedId?sort=-val&skip=0&limit=100 Get pubMedId list
 * @apiParam {String="val"} sort="val" Sort field.
 * Set prefix "-" for desc direction. For example: -val.
 * @apiParam {Number} skip=0 Skip (offset) pubMedId
 * @apiParam {Number} limit=50 Max pubMedId per page (min 1, max 1000)
 * @apiParamExample {json} Request-Example:
 * {
 *   "sort":"val",
 *   "skip": 0,
 *   "limit": 100
 * }
 * @apiError (400) InvalidRequestModel Invalid request model.
 * @apiSuccess (200) {IdVal[]} pubMedId Methods list
 * @apiSuccessExample Success Response:
 * 200 OK
 * {
 *   "list": [
 *     {
 *       "id": "...",
 *       "val": "..."
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
const pubMedIdList = async (ctx: Context): Promise<void> => {
  const req = await verifySchema<ListRequest>(schema, ctx.request.query);
  const list = await getPubMedIdList(req);

  ctx.body = { list };
};
