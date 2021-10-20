import { AppError } from 'src/app/core/typings/common';

export type ImportStatus = 'uploading' | 'importing' | 'complete';

export type UploadResult = {
  readonly fileId: string;
};

export type Payload<T> = {
  readonly fileId: string;
  readonly rowNumber: number;
  readonly progress: number;
  readonly error?: AppError;
  readonly item?: T;
};

export type LogMessage = {
  readonly error: boolean;
  readonly message: string;
};
