import { LogMessage, Payload } from 'src/app/import/typings/upload';

export { formatLogMessage };

const formatLogMessage = ({ error, id, item, raw, msg }: Payload): LogMessage => {
  const rowStr = `Row ${id}:`;

  let message = '';
  if (error) {
    message = `${rowStr} Eror: ${error.message || error.code || ''}; Data: ${JSON.stringify(raw || {})}`;
  } else if (msg) {
    message = msg;
  } else if (item) {
    message = `${rowStr} Success: ${JSON.stringify(item)}`;
  }

  return { error: !!error, message, id };
};
