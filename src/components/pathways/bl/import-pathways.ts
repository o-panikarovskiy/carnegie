import joi from 'joi';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { importRows } from '../../upload/bl/import-rows.js';
import { Pathway } from '../models.js';
import { insertPathway } from '../repository/insert-pathway.js';

export { importPathways };

const schema = joi
  .object()
  .keys({
    name: joi.string().required(),
    id: joi.string().trim().max(50).required(),
  })
  .unknown(true);

const importPathways = async (fileId: string, creator: User, list: readonly StringAnyMap[]): Promise<readonly Pathway[]> => {
  return importRows<Pathway>(fileId, creator, list, importPathway);
};

const importPathway = async (creator: User, raw: StringAnyMap): Promise<Pathway> => {
  const req = await verifySchema<Pathway>(schema, raw);
  return insertPathway(req);
};
