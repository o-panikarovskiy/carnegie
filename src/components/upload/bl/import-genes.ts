import joi from 'joi';
import { sendToSocket } from '../../../sockets/index.js';
import { StringAnyMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { User } from '../../auth/models.js';
import { insertGene } from '../../dictionaries/index.js';
import { Gene, NewGene } from '../../dictionaries/models.js';

export { importGenes };

const schema = joi
  .object()
  .keys({
    name: joi.string().max(255).allow('', null),
    symbol: joi.string().max(50).allow('', null),
    accession: joi.string().trim().max(50).required(),
  })
  .unknown(true);

const importGenes = async (fileId: string, creator: User, list: readonly StringAnyMap[]): Promise<void> => {
  const total = list.length;
  const event = 'import:item:complete';

  for (let idx = 0; idx < total; idx++) {
    const raw = list[idx];
    const rowNumber = idx + 1;
    const progress = Math.round((idx / total) * 100);
    try {
      const gene = await importGene(creator, raw);
      sendToSocket(creator.email, { event, payload: { fileId, rowNumber, progress, gene } });
    } catch (error) {
      sendToSocket(creator.email, { event, payload: { fileId, rowNumber, progress, error } });
    }
  }

  sendToSocket(creator.email, { event: 'import:complete', payload: { fileId } });
};

const importGene = async (creator: User, raw: StringAnyMap): Promise<Gene> => {
  const req = await verifySchema<NewGene>(schema, raw);
  return insertGene(req);
};
