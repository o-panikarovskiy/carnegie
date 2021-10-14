import { LogLevel } from '../log/typings.js';

export type NodeEnv = 'test' | 'local' | 'develop' | 'pp' | 'production';

export type AppConfig = {
  readonly port: number;
  readonly rootPath: string;
  readonly logLevel: keyof typeof LogLevel;
  readonly postreSql: PGSettings;
  readonly upload: UploadSettings;
  readonly tokenSign: string;
};

export type UploadSettings = {
  uploadDir: string;
  maxFileSize?: number;
  maxFields?: number;
  onFileBegin?: (name: string, file: any) => void;
};

export type PGSettings = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
};
