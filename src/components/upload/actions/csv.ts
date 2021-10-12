import { Context } from 'koa';
import { AppBadRequest } from '../../../errors/app-error.js';
import { readCSV } from '../bi/read-csv.js';

export { uploadCSV };

const uploadCSV = async (ctx: Context): Promise<void> => {
  const file = ctx.request.files?.file;
  if (!file) throw new AppBadRequest('Empty request');
  if (Array.isArray(file)) throw new AppBadRequest('Array of files not allowed');

  const results = await readCSV(file);
  ctx.body = { results };
};
