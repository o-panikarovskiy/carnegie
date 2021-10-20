import parse from 'csv-parse';
import { File } from 'formidable';
import { createReadStream } from 'fs';
import { AppError } from '../../../errors/app-error.js';
import { BAD_REQUEST } from '../../../errors/common-errors.js';
import { StringAnyMap } from '../../../typings/index.js';

export { readCSV };

const readCSV = async (file: File): Promise<readonly StringAnyMap[]> => {
  const results: any = [];
  const parser = parse({ columns: true });

  try {
    createReadStream(file.path).pipe(parser);
    for await (const record of parser) {
      results.push(record);
    }
    return results;
  } catch (error) {
    throw new AppError({
      message: error.message,
      code: error.code,
      details: error,
      status: BAD_REQUEST,
    });
  }
};
