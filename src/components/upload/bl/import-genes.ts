import { sendToSocket } from '../../../sockets/index.js';
import { StringAnyMap } from '../../../typings/index.js';
import { User } from '../../auth/models.js';
import { Gene } from '../../dictionaries/models.js';

export { importGenes };

const importGenes = async (fileId: string, creator: User, list: readonly StringAnyMap[]): Promise<void> => {
  const total = list.length;

  for (let idx = 0; idx < total; idx++) {
    const raw = list[idx];
    const progress = Math.round((idx / total) * 100);
    const event = 'import:item:complete';
    try {
      const gene = await importGene(creator, raw);
      sendToSocket(creator.email, { event, payload: { fileId, progress, gene } });
    } catch (error) {
      sendToSocket(creator.email, { event, payload: { fileId, progress, error } });
    }
  }

  sendToSocket(creator.email, { event: 'import:complete', payload: { fileId } });
};

const importGene = async (creator: User, raw: StringAnyMap): Promise<Gene> => {
  await delay(100);
  return raw as Gene;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
