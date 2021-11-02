import joi from 'joi';
import { Context } from 'koa';
import { verifySchema } from '../../../utils/joi.js';
import { ProteinRequest } from '../models.js';
import { getProteinsList } from '../repository/get-proteins-list.js';

export { proteinsList };

const schema = joi.object().keys({
  sort: joi.string().trim().max(50).default('name'),
  skip: joi.number().positive().allow(0).default(0),
  limit: joi.number().positive().min(1).max(100).default(100),
  term: joi.string().optional().allow('').trim().max(512),
  columns: joi.array().optional().items(joi.string().trim().max(50)).max(100),
  gene: joi.array().optional().items(joi.string().trim().max(50)).max(100),
  domain: joi.array().optional().items(joi.string().trim().guid()).max(100),
  family: joi.array().optional().items(joi.string().trim().guid()).max(100),
  method: joi.array().optional().items(joi.string().trim().max(20)).max(100),
  pubMedId: joi.array().optional().items(joi.string().trim().max(50)).max(100),
  organelleId: joi.array().optional().items(joi.string().trim().max(50)).max(100),
});

/**
 * @apiGroup Proteins
 * @apiName GetProteinsList
 * @api {post} /proteins/ Get proteins list
 * @apiParam {string{0..50}} [sort=name] Sort field. Set prefix "-" for change direction. For example: -name.
 * @apiParam {number{0}} [skip=0] Skip (offset) items
 * @apiParam {number{1-100}} [limit=100] Max items per page (min 1, max 100)
 * @apiParam {string{0..512}} [term] Search term
 * @apiParam {string[]} [columns] Table column names (max 100 items)
 * @apiParam {string[]} [gene] Filter by gene id (max 100 items)
 * @apiParam {string[]} [domain] Filter by domain id (max 100 items)
 * @apiParam {string[]} [family] Filter by family id (max 100 items)
 * @apiParam {string[]} [method] Filter by method (max 100 items)
 * @apiParam {string[]} [pubMedId] Filter by publication (max 100 items)
 * @apiParam {string[]} [organelleId] Filter by organelle id (max 100 items)
 * @apiParamExample {json} Request-Example:
 * {
 *   "sort":"name",
 *   "skip": 0,
 *   "limit": 100,
 *   "gene": ["AT1G50170", "AT1G50171"]
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
