import joi from 'joi';
import { Context } from 'koa';
import { verifySchema } from '../../../utils/joi.js';
import { ProteinRequest } from '../models.js';
import { getProteinsList } from '../repository/get-proteins-list.js';

export { proteinsList };

const schema = joi.object().keys({
  sort: joi.string().trim().max(50).default('name'),
  skip: joi.number().positive().allow(0).default(0),
  limit: joi.number().positive().min(1).max(1000).default(100),
  term: joi.string().optional().allow('').trim().max(512),
  gene: joi.array().optional().items(joi.string().trim().max(50)).max(100),
  domain: joi.array().optional().items(joi.string().trim().guid()).max(100),
  family: joi.array().optional().items(joi.string().trim().guid()).max(100),
  locMethod: joi.array().optional().items(joi.string().trim().max(25)).max(100),
  locOrganelle: joi.array().optional().items(joi.string().trim().max(50)).max(100),
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
 *   "total": 100,
 *   "proteins": [
 *     {
 *       "id": "...",
 *       "name": "protein 1"
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
const proteinsList = async (ctx: Context): Promise<void> => {
  const req = await verifySchema<ProteinRequest>(schema, ctx.request.body);
  const { proteins, total } = await getProteinsList(req);

  ctx.body = { proteins, total };
};
