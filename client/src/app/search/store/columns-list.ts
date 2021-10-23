import { ProteinColumn, TableColumn } from 'src/app/search/typings/table';
import { indexBy } from 'src/app/shared/utils/app-utils';

export { TABLE_COLUMNS_LIST, TABLE_COLUMNS_MAP_BY_ID, DEFAULT_TABLE_COLUMNS };

const TABLE_COLUMNS_LIST: readonly TableColumn[] = [
  {
    id: 'uniProtId',
    friendlyName: 'ID',
    dropdownItemName: 'Protein ID',
  },
  {
    id: 'name',
    friendlyName: 'Name',
    dropdownItemName: 'Protein name',
  },
  {
    id: 'description',
    friendlyName: 'Description',
    dropdownItemName: 'Protein Description',
  },
  {
    id: 'species',
    friendlyName: 'Species',
    dropdownItemName: 'Species',
  },
  {
    id: 'sequence',
    friendlyName: 'Sequence',
    dropdownItemName: 'Sequence',
  },
  {
    id: 'isEnzyme',
    friendlyName: 'Enzyme',
    dropdownItemName: 'Enzyme',
  },
  {
    id: 'gene',
    friendlyName: 'Gene',
    dropdownItemName: 'Gene name',
  },
  {
    id: 'domain',
    friendlyName: 'Domain',
    dropdownItemName: 'Domain name',
  },
  {
    id: 'family',
    friendlyName: 'Family',
    dropdownItemName: 'Family name',
  },
] as const;

const TABLE_COLUMNS_MAP_BY_ID = indexBy<TableColumn>(TABLE_COLUMNS_LIST, 'id');
const DEFAULT_TABLE_COLUMNS: readonly ProteinColumn[] = ['uniProtId', 'name', 'description', 'isEnzyme', 'gene'] as const;
