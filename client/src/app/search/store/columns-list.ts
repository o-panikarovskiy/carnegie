import { ProteinColumn, TableColumn } from 'src/app/search/typings/table';
import { indexBy } from 'src/app/shared/utils/app-utils';

export { TABLE_COLUMNS_LIST, TABLE_COLUMNS_MAP_BY_ID, DEFAULT_TABLE_COLUMNS };

const TABLE_COLUMNS_LIST: readonly TableColumn[] = [
  {
    id: 'name',
    friendlyName: 'Protein name',
    dropdownItemName: 'Protein name',
  },
  {
    id: 'gene',
    friendlyName: 'Gene name',
    dropdownItemName: 'Gene name',
  },
  {
    id: 'domain',
    friendlyName: 'Domain name',
    dropdownItemName: 'Domain name',
  },
  {
    id: 'family',
    friendlyName: 'Family name',
    dropdownItemName: 'Family name',
  },
] as const;

const TABLE_COLUMNS_MAP_BY_ID = indexBy<TableColumn>(TABLE_COLUMNS_LIST, 'id');
const DEFAULT_TABLE_COLUMNS: readonly ProteinColumn[] = ['name', 'gene'] as const;
