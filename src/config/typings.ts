import { LogLevel } from '../log/typings.js';

export type NodeEnv = 'test' | 'local' | 'develop' | 'pp' | 'production';

export type AppConfig = {
  readonly port: number;
  readonly logLevel: keyof typeof LogLevel;
  readonly postreSql: PGSettings;
};

export type PGSettings = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
};
