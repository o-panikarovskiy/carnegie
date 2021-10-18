import { Context } from 'koa';
import { AppBadRequest } from '../../../errors/app-error.js';
import { NO_CONTENT } from '../../../errors/index.js';
import { importGenes } from '../bi/import-genes.js';
import { readCSV } from '../bi/read-csv.js';

export { uploadGenes };

const uploadGenes = async (ctx: Context): Promise<void> => {
  const file = ctx.request.files?.file;
  if (!file) throw new AppBadRequest('Empty request');
  if (Array.isArray(file)) throw new AppBadRequest('Array of files not allowed');

  const results = await readCSV(file);
  importGenes(ctx.state.user, results); // don't wait

  ctx.status = NO_CONTENT;
};
