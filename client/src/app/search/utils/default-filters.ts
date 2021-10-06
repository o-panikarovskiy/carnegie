import { ActiveFilter } from 'src/app/search/models';

export { FILTERS_ARRAY_SET, DEFAULT_FILTERS_LIST };

const FILTERS_ARRAY_SET = new Set<string>(['gene', 'domain', 'family']);

const DEFAULT_FILTERS_LIST: readonly ActiveFilter[] = [
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'genes$',
    selectedIdsName: 'gene',
    buttonText: { '=0': 'Genes', '=1': '1 gene', other: '# genes' },
  },
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'domains$',
    selectedIdsName: 'domain',
    buttonText: { '=0': 'Domains', '=1': '1 domain', other: '# domains' },
  },
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'families$',
    selectedIdsName: 'family',
    buttonText: { '=0': 'Families', '=1': '1 family', other: '# families' },
  },
];
