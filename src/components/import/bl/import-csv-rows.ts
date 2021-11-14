import { parseError } from '../../../errors/utils/parse-error.js';
import { sendToSocket } from '../../../sockets/server.js';
import { StringAnyMap } from '../../../typings/index.js';
import { User } from '../../auth/models.js';
import { Payload } from '../models.js';

export { importCSVRows };

const importCSVRows = async <T>(
  importToken: string,
  creator: User,
  rows: readonly StringAnyMap[],
  createItem: (creator: User, raw: StringAnyMap) => Promise<T>,
): Promise<readonly T[]> => {
  const total = rows.length;
  const event = 'import:item:complete';

  const items: T[] = [];
  for (let idx = 0; idx < total; idx++) {
    const raw = rows[idx];
    const id = idx + 1;
    const progress = Math.round((idx / total) * 100);
    try {
      const item = await createItem(creator, raw);
      const payload: Payload<T> = { importToken, id, progress, item };
      items.push(item);
      sendToSocket<Payload<T>>(creator.email, { event, payload });
    } catch (error) {
      const payload: Payload<T> = { importToken, id, progress, raw, error: parseError(error) };
      sendToSocket<Payload<T>>(creator.email, { event, payload });
    }
  }

  const payload: Payload<T> = { importToken, id: total, progress: 100 };
  sendToSocket<Payload<T>>(creator.email, { event: 'import:complete', payload });

  return items;
};
