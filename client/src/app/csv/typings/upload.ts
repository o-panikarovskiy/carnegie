import { AppError } from 'src/app/core/typings/common';

export type ImportStatus = 'uploading' | 'importing' | 'complete';

export type UploadRequest = {
  readonly file: File;
  readonly separator: string;
};

export type Payload<T> = {
  readonly fileId: string;
  readonly rowNum: number;
  readonly progress: number;
  readonly error?: AppError;
  readonly item?: T;
};

export type LogMessage = {
  readonly id: string | number;
  readonly error: boolean;
  readonly message: string;
};
