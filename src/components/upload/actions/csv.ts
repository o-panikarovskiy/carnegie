import { unlink } from 'fs';
import { Context } from 'koa';
import { basename } from 'path';
import { AppBadRequest } from '../../../errors/app-error.js';
import { StringTMap } from '../../../typings/index.js';
import { importGenes } from '../bl/import-genes.js';
import { importProteins } from '../bl/import-proteins.js';
import { readCSV } from '../bl/read-csv.js';
import { ImportTable } from '../models.js';

export { uploadCSV };

const IMPORTS: StringTMap<ImportTable> = {
  genes: importGenes,
  proteins: importProteins,
};

const uploadCSV = async (ctx: Context): Promise<void> => {
  const file = ctx.request.files?.file;
  if (!file) throw new AppBadRequest('Empty request');
  if (Array.isArray(file)) throw new AppBadRequest('Array of files not allowed');

  const imp = IMPORTS[ctx.request.body?.table];
  if (!imp) throw new AppBadRequest('Invalid table name');

  try {
    const csv = await readCSV(file);
    const fileId = basename(file.path).replace('uload_', '');

    imp(fileId, ctx.state.user, csv); // don't wait

    ctx.body = { fileId };
  } finally {
    unlink(file.path, () => void 0);
  }
};
