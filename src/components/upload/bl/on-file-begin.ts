import { File } from 'formidable';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { appConfig } from '../../../config/index.js';

export { onFileBegin };

const onFileBegin = function (this: any, name: string, file: File) {
  const uploadDir = appConfig.upload.uploadDir;

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  file.path = join(uploadDir, 'file.csv');

  return;
};
