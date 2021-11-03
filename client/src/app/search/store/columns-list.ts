import { indexBy } from 'src/app/core/utils/app-utils';
import { ProteinColumn, TableColumn } from 'src/app/search/typings/table';

export { TABLE_COLUMNS_LIST, TABLE_COLUMNS_MAP_BY_ID, DEFAULT_TABLE_COLUMNS };

const TABLE_COLUMNS_LIST: readonly TableColumn[] = [
  {
    id: 'id',
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
    id: 'geneName',
    friendlyName: 'Gene name',
    dropdownItemName: 'Gene name',
  },
  {
    id: 'geneId',
    friendlyName: 'Gene accession',
    dropdownItemName: 'Gene accession',
  },
  {
    id: 'domainName',
    friendlyName: 'Domain',
    dropdownItemName: 'Domain name',
  },
  {
    id: 'familyName',
    friendlyName: 'Family',
    dropdownItemName: 'Family name',
  },
  {
    id: 'method',
    friendlyName: 'Method',
    dropdownItemName: 'Method',
  },
  {
    id: 'pubMedId',
    friendlyName: 'Pub MedID',
    dropdownItemName: 'Pub MedID',
  },
  {
    id: 'organelleId',
    friendlyName: 'Organelle',
    dropdownItemName: 'Organelle',
  },
  {
    id: 'geneAliases',
    friendlyName: 'Gene Aliases',
    dropdownItemName: 'Gene Aliases',
  },
  {
    id: 'proteinAliases',
    friendlyName: 'Protein Aliases',
    dropdownItemName: 'Protein Aliases',
  },
] as const;

const TABLE_COLUMNS_MAP_BY_ID = indexBy<TableColumn>(TABLE_COLUMNS_LIST, 'id');
const DEFAULT_TABLE_COLUMNS: readonly ProteinColumn[] = ['name', 'id', 'organelleId', 'method', 'geneId'] as const;
