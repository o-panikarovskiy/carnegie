import { Context } from 'koa';
import { AppBadRequest } from '../../../errors/app-error.js';
import { getRandomString } from '../../../utils/get-random-string.js';
import { importGenes } from '../bl/import-genes.js';
import { readCSV } from '../bl/read-csv.js';

export { uploadGenes };

const uploadGenes = async (ctx: Context): Promise<void> => {
  const file = ctx.request.files?.file;
  if (!file) throw new AppBadRequest('Empty request');
  if (Array.isArray(file)) throw new AppBadRequest('Array of files not allowed');

  const fileId = getRandomString(16);
  const results = await readCSV(file);
  importGenes(fileId, ctx.state.user, results); // don't wait

  ctx.body = { fileId };
};
