import { AppError } from '../../../errors/app-error.js';
import { sendToSocket } from '../../../sockets/index.js';
import { User } from '../../auth/models.js';
import { importCSVRows } from '../../import/index.js';
import { Payload } from '../../import/models.js';
import { Paper } from '../models.js';
import { getEmptyPapersIds } from '../repository/get-empty-papers.js';
import { insertPaper } from '../repository/insert-paper.js';
import { fetchFromNCBI } from './fetch-from-ncbi.js';

export { importPapers };

const importPapers = async (importToken: string, creator: User): Promise<readonly Paper[]> => {
  const emptyPapers = await getEmptyPapersIds();
  const papers = await fetchEmptyPapers(importToken, creator, emptyPapers);
  return importCSVRows<Paper>(importToken, creator, papers, importPaper);
};

const importPaper = async (creator: User, paper: Paper): Promise<Paper> => {
  return insertPaper(paper);
};

const fetchEmptyPapers = async (importToken: string, creator: User, list: readonly string[], batchSize = 10): Promise<readonly Paper[]> => {
  let err: AppError | undefined;
  let result: readonly Paper[] = [];

  if (list.length === 0) {
    sendToSocket<Payload>(creator.email, {
      event: 'import:complete',
      payload: {
        importToken,
        id: 'complete',
        msg: `Papers without titles not found. Import complete.`,
      },
    });
    return result;
  }

  sendToSocket<Payload>(creator.email, {
    event: 'import:fetch:start',
    payload: {
      importToken,
      id: 'fetchstart',
      msg: `Found ${list.length} papers without titles. Fetching data from NCBI...`,
    },
  });

  const batches: string[][] = [];
  for (let i = 0; i < list.length; i += batchSize) {
    const batch = list.slice(i, i + batchSize);
    batches.push(batch);
  }

  try {
    const papers = await Promise.all(batches.map(fetchFromNCBI));
    result = papers.reduce((acc, batch) => [...acc, ...batch], [] as readonly Paper[]);
  } catch (error) {
    err = error;
  }

  sendToSocket<Payload>(creator.email, {
    event: 'import:fetch:complete',
    payload: { importToken, id: 'fetchcomplete', msg: 'Fetching complete.', error: err },
  });

  return result;
};
