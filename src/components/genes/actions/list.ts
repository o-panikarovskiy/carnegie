import joi from 'joi';
import { Context } from 'koa';
import { ListRequest } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { getGenesList } from '../repository/get-genes-list.js';

export { genesList };

const schema = joi.object().keys({
  search: joi.string().trim().max(50).allow('', null),
  sort: joi.string().trim().max(50).default('name'),
  skip: joi.number().positive().allow(0).default(0),
  limit: joi.number().positive().min(1).max(1000).default(50),
});

/**
 * @apiGroup Genes
 * @apiName GetGenesList
 * @apiVersion 1.0.0
 * @api {get} /genes?sort=-name&skip=0&limit=100 Get genes list
 * @apiParam {String="name"} sort="name" Sort field.
 * Set prefix "-" for desc direction. For example: -name.
 * @apiParam {Number} skip=0 Skip (offset) genes
 * @apiParam {Number} limit=50 Max genes per page (min 1, max 1000)
 * @apiParamExample {json} Request-Example:
 * {
 *   "sort":"name",
 *   "skip": 0,
 *   "limit": 100
 * }
 * @apiError (400) InvalidRequestModel Invalid request model.
 * @apiSuccess (200) {Gene[]} genes Genes list
 * @apiSuccessExample Success Response:
 * 200 OK
 * {
 *   "genes": [
 *     {
 *       "accession": "...",
 *       "name": "gene 1"
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
const genesList = async (ctx: Context): Promise<void> => {
  const req = await verifySchema<ListRequest>(schema, ctx.request.query);
  const genes = await getGenesList(req);

  ctx.body = { genes };
};
