import { User } from '../../auth/models.js';
import { Paper } from '../models.js';
import { getEmptyPapersIds } from '../repository/get-empty-papers.js';

export { importPapers };

const importPapers = async (fileId: string, creator: User): Promise<readonly Paper[]> => {
  const bachSize = 10;
  const emptyPapers = await getEmptyPapersIds();

  return [];
};

const fetchFromNCBI = async (ids: readonly string[]) => {
  return;
};

// const importPaper = async (creator: User, raw: StringAnyMap): Promise<Paper> => {
//   // const req = await verifySchema<Paper>(schema, raw);
//   // return insertPaper(req);
// };
