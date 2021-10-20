import { sendToSocket } from '../../../sockets/server.js';
import { StringAnyMap } from '../../../typings/index.js';
import { User } from '../../auth/models.js';
import { Payload } from '../models.js';

export { importRows };

const importRows = async <T>(
  fileId: string,
  creator: User,
  list: readonly StringAnyMap[],
  createItem: (creator: User, raw: StringAnyMap) => Promise<T>
): Promise<readonly T[]> => {
  const total = list.length;
  const event = 'import:item:complete';

  const items: T[] = [];
  for (let idx = 0; idx < total; idx++) {
    const raw = list[idx];
    const rowNum = idx + 1;
    const progress = Math.round((idx / total) * 100);
    try {
      const item = await createItem(creator, raw);
      const payload: Payload<T> = { fileId, rowNum, progress, item };
      items.push(item);
      sendToSocket<Payload<T>>(creator.email, { event, payload });
    } catch (error) {
      const payload: Payload<T> = { fileId, rowNum, progress, error };
      sendToSocket<Payload<T>>(creator.email, { event, payload });
    }
  }

  const payload: Payload<T> = { fileId, rowNum: total, progress: 100 };
  sendToSocket<Payload<T>>(creator.email, { event: 'import:complete', payload });

  return items;
};
