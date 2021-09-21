const errorToObject = (e: any): any => {
  if (typeof e !== 'object' || e === null) {
    return { message: e };
  }

  return Object.getOwnPropertyNames(e).reduce((acc: any, key: string) => {
    acc[key] = e[key];
    return acc;
  }, {});
};

export { errorToObject };
