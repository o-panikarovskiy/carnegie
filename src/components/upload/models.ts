import { IAppError } from '../../errors/index.js';
import { StringAnyMap } from '../../typings/index.js';
import { User } from '../auth/models.js';

export type ImportRequest = {
  table: string;
  separator: string;
};

export type Payload<T> = {
  readonly fileId: string;
  readonly rowNum: number;
  readonly progress: number;
  readonly error?: IAppError;
  readonly item?: T;
};

export type ImportTable<T = any> = (fileId: string, creator: User, list: readonly StringAnyMap[]) => Promise<readonly T[]>;
