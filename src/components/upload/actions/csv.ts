import { unlink } from 'fs';
import joi from 'joi';
import { Context } from 'koa';
import { basename } from 'path';
import { AppBadRequest } from '../../../errors/app-error.js';
import { StringTMap } from '../../../typings/index.js';
import { verifySchema } from '../../../utils/joi.js';
import { importGenes } from '../../genes/index.js';
import { importLocalizations } from '../../localization/index.js';
import { importProteins } from '../../proteins//index.js';
import { readCSV } from '../bl/read-csv.js';
import { ImportRequest, ImportTable } from '../models.js';

export { uploadCSV };

const schema = joi.object().keys({
  escape: joi.string().allow('"', '""', '').default('"'),
  delimiter: joi.string().allow(',', ';', '|', '\t').default(','),
  table: joi.string().allow('genes', 'proteins', 'localizations').required(),
});

const IMPORTS: StringTMap<ImportTable> = {
  genes: importGenes,
  proteins: importProteins,
  localizations: importLocalizations,
};

const uploadCSV = async (ctx: Context): Promise<void> => {
  const file = ctx.request.files?.file;
  if (!file) throw new AppBadRequest('Empty request');
  if (Array.isArray(file)) throw new AppBadRequest('Array of files not allowed');

  const req = await verifySchema<ImportRequest>(schema, ctx.request.body);

  const imp = IMPORTS[req.table];
  if (!imp) throw new AppBadRequest('Invalid import name');

  try {
    const csv = await readCSV(file, req);
    const fileId = basename(file.path).replace('uload_', '');

    imp(fileId, ctx.state.user, csv); // don't wait

    ctx.body = { fileId };
  } finally {
    unlink(file.path, () => void 0);
  }
};
