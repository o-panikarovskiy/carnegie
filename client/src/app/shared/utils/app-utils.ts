import { StringAnyMap } from 'src/app/typings/common';

export { indexBy, omitEmptyProps };

const indexBy = <T extends StringAnyMap>(arr: readonly T[], key: keyof T) => {
  return arr.reduce((map, item) => {
    map.set(item[key], item);
    return map;
  }, new Map<string, T>());
};

const omitEmptyProps = <T extends StringAnyMap>(object: T | undefined): T => {
  if (typeof object === 'object' && object !== null) {
    return Object.keys(object).reduce((acc, key) => {
      if (object[key] !== null && object[key] !== undefined) {
        (acc as any)[key] = object[key];
      }
      return acc;
    }, {} as T);
  }
  return {} as T;
};
