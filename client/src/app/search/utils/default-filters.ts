import { ActiveFilter } from 'src/app/search/models';

export { FILTERS_ARRAY_SET, DEFAULT_FILTERS_LIST };

const FILTERS_ARRAY_SET = new Set<string>(['gene', 'domain', 'family']);

const DEFAULT_FILTERS_LIST: readonly ActiveFilter[] = [
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'genes$',
    selectedIdsName: 'gene',
    buttonText: { '=0': 'No genes', '=1': '1 gene', other: '# genes' },
  },
];
