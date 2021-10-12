import { dirname, join } from 'path';
import { onFileBegin } from '../components/upload/bi/on-file-begin.js';
import { AppConfig } from './typings.js';

const ROOT_PATH = new URL(join(dirname(import.meta.url), '..', '..')).pathname;

const defaultConfig: Partial<AppConfig> = {
  port: 3000,
  logLevel: 'info',
  rootPath: ROOT_PATH,
  upload: {
    uploadDir: join(ROOT_PATH, 'upload'),
    maxFileSize: 10 * 1024 * 1024,
    maxFields: 1,
    onFileBegin,
  },
};

export { defaultConfig };
