import joi from 'joi';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { AppBadRequest } from '../../../errors/app-error.js';
import { StringTMap } from '../../../typings/index.js';
import { getRandomString } from '../../../utils/get-random-string.js';
import { verifySchema } from '../../../utils/joi.js';
import { importPapers } from '../../papers/index.js';
import { ImportRequest, ImportResponse, ProcessImportTable } from '../models.js';

export { importTable };

const IMPORTS: StringTMap<ProcessImportTable> = {
  papers: importPapers,
};

const schema = joi.object().keys({
  table: joi
    .string()
    .allow(...Object.keys(IMPORTS))
    .required(),
});

const importTable = async (ctx: ParameterizedContext<DefaultState, DefaultContext, ImportResponse>): Promise<void> => {
  const req = await verifySchema<ImportRequest>(schema, ctx.request.body);

  const imp = IMPORTS[req.table];
  if (!imp) throw new AppBadRequest('Invalid import name');

  const importToken = getRandomString(48);
  imp(importToken, ctx.state.user); // don't wait

  ctx.body = { importToken };
};
