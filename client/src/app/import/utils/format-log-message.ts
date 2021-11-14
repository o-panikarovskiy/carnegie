import { LogMessage, Payload } from 'src/app/import/typings/upload';

export { formatLogMessage };

const formatLogMessage = ({ error, rowNum, item, raw }: Payload): LogMessage => {
  const rowStr = `Row ${rowNum}:`;

  let id = '';
  let message = '';
  if (error) {
    id = rowNum + '';
    message = `${rowStr} Eror: ${error.message || error.code || ''}; Data: ${JSON.stringify(raw || {})}`;
  } else if (item) {
    message = `${rowStr} Success: ${JSON.stringify(item)}`;
  }

  return { error: !!error, message, id };
};
