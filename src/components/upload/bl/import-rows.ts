import { IAppError } from '../../../errors/app-error.js';
import { sendToSocket } from '../../../sockets/server.js';
import { StringAnyMap } from '../../../typings/index.js';
import { User } from '../../auth/models.js';

export { importRows, Payload };

type Payload<T> = {
  readonly fileId: string;
  readonly rowNumber: number;
  readonly progress: number;
  readonly error?: IAppError;
  readonly item?: T;
};

const importRows = async <T>(
  fileId: string,
  creator: User,
  list: readonly StringAnyMap[],
  callback: (creator: User, raw: StringAnyMap) => Promise<T>
): Promise<void> => {
  const total = list.length;
  const event = 'import:item:complete';

  for (let idx = 0; idx < total; idx++) {
    const raw = list[idx];
    const rowNumber = idx + 1;
    const progress = Math.round((idx / total) * 100);
    try {
      const item = await callback(creator, raw);
      sendToSocket<Payload<T>>(creator.email, { event, payload: { fileId, rowNumber, progress, item } });
    } catch (error) {
      sendToSocket<Payload<T>>(creator.email, { event, payload: { fileId, rowNumber, progress, error } });
    }
  }

  sendToSocket(creator.email, { event: 'import:complete', payload: { fileId } });
};
