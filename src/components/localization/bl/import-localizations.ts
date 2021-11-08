import joi from 'joi';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { insertMethod } from '../../methods/index.js';
import { importRows } from '../../upload/bl/import-rows.js';
import { Localization } from '../models.js';
import { insertLocalization } from '../repository/insert-localization.js';

export { importLocalizations };

const schema = joi
  .object()
  .keys({
    proteinId: joi.string().max(50).required(),
    organelleId: joi.string().max(50).required(),
    methodId: joi.string().trim().max(20).required(),
    pubMedId: joi.string().trim().max(50).required(),
  })
  .unknown(true);

const importLocalizations = async (fileId: string, creator: User, list: readonly StringAnyMap[]): Promise<readonly Localization[]> => {
  return importRows<Localization>(fileId, creator, list, importLocalization);
};

const importLocalization = async (creator: User, raw: StringAnyMap): Promise<Localization> => {
  const req = await verifySchema<Localization>(schema, raw);
  await insertMethod({ type: req.methodId });
  return insertLocalization(req);
};
