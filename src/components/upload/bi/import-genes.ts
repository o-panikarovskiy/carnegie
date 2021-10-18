import { sendToSocketByKey } from '../../../routes/sockets.js';
import { StringAnyMap } from '../../../typings/index.js';
import { User } from '../../auth/models.js';

export { importGenes };

const importGenes = async (creator: User, list: readonly StringAnyMap[]): Promise<void> => {
  for (const rawGene of list) {
    await importGene(creator, rawGene);
  }

  sendToSocketByKey(creator.email, { message: 'import:genes:complete' });
};

const importGene = async (creator: User, rawGene: StringAnyMap): Promise<void> => {
  await delay(1000);
  const payload = rawGene;
  const message = 'import:gene:success';

  sendToSocketByKey(creator.email, { message, payload });
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
