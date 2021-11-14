import joi from 'joi';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { importCSVRows } from '../../import/index.js';
import { Gene } from '../models.js';
import { insertGene } from '../repository/insert-gene.js';

export { importGenes };

const schema = joi
  .object()
  .keys({
    name: joi.string().max(255).allow('', null),
    symbol: joi.string().max(50).allow('', null),
    accession: joi.string().trim().max(50).required(),
  })
  .unknown(true);

const importGenes = async (fileId: string, creator: User, list: readonly StringAnyMap[]): Promise<readonly Gene[]> => {
  return importCSVRows<Gene>(fileId, creator, list, importGene);
};

const importGene = async (creator: User, raw: StringAnyMap): Promise<Gene> => {
  const req = await verifySchema<Gene>(schema, raw);
  return insertGene(req);
};
