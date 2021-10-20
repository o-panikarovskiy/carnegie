import { LogMessage, Payload } from 'src/app/csv/typings/upload';
import { Gene } from 'src/app/search/typings/gene';

export { formatLogMessage };

const formatLogMessage = ({ error, rowNumber, item }: Payload<Gene>): LogMessage => {
  const rowStr = `Row ${rowNumber}:`;

  let msg = '';
  if (error) {
    msg = `${rowStr} ${error.message}`;
  } else if (item) {
    msg = `${rowStr} ${item.name || item.accession} imported successfully`;
  }

  return { error: !!error, message: msg };
};
