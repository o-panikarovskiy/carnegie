import { unlink } from 'fs';
import joi from 'joi';
import { Context } from 'koa';
import { basename } from 'path';
import { AppBadRequest } from '../../../errors/app-error.js';
import { StringTMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { importGenes } from '../bl/import-genes.js';
import { readCSV } from '../bl/read-csv.js';
import { ImportTable } from '../models.js';

export { uploadCSV };

const schema = joi.object().keys({
  table: joi.allow('genes'),
});

const IMPORTS: StringTMap<ImportTable> = {
  genes: importGenes,
};

const uploadCSV = async (ctx: Context): Promise<void> => {
  const file = ctx.request.files?.file;
  if (!file) throw new AppBadRequest('Empty request');
  if (Array.isArray(file)) throw new AppBadRequest('Array of files not allowed');

  const { table } = await verifySchema<{ table: string }>(schema, ctx.request.body);

  const imp = IMPORTS[table];
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
