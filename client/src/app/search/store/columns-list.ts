import { Protein, TableColumn } from 'src/app/search/models';

export { TABLE_COLUMNS_LIST, DEFAULT_TABLE_COLUMNS };

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

const DEFAULT_TABLE_COLUMNS: readonly (keyof Protein)[] = ['name', 'gene'] as const;
