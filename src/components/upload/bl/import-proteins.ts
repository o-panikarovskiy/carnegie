import joi from 'joi';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { insertProtein } from '../../proteins/index.js';
import { Protein } from '../../proteins/models.js';
import { importRows } from './import-rows.js';

export { importProteins };

const schema = joi
  .object()
  .keys({
    geneId: joi.string().trim().max(50),
    uniProtId: joi.string().trim().max(50),
    name: joi.string().max(255).allow('', null),
    species: joi.string().allow('', null),
    description: joi.string().allow('', null),
    isEnzyme: joi.string().allow('TRUE', 'FALSE', '', null),
    sequence: joi.string().allow('', null),
    length: joi
      .string()
      .max(16)
      .pattern(/^[0-9]+$/),
  })
  .unknown(true);

const importProteins = async (fileId: string, creator: User, list: readonly StringAnyMap[]): Promise<readonly Protein[]> => {
  return importRows<Protein>(fileId, creator, list, importProtein);
};

const importProtein = async (creator: User, raw: StringAnyMap): Promise<Protein> => {
  const req = await verifySchema<Protein>(schema, raw);
  return insertProtein(req);
};