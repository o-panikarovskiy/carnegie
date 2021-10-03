import * as sqlStorege from './sql-storage/index.js';

export function init(): Promise<readonly unknown[]> {
  return Promise.all([
    sqlStorege.init(), //
  ]);
}

export function stop(): Promise<readonly unknown[]> {
  return Promise.all([
    sqlStorege.stop(), //
  ]);
}

export function clear(): Promise<void> {
  return sqlStorege.clear();
}
