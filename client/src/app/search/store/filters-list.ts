import { AppFilter } from 'src/app/search/typings/table';
import { indexBy } from 'src/app/shared/utils/app-utils';

export { APP_FILTERS_LIST, APP_FILTERS_MAP_BY_PARAM_NAME };

const APP_FILTERS_LIST: readonly AppFilter[] = [
  {
    idFieldName: 'accession',
    labelFieldName: 'name',
    dataSourceName: 'genes$',
    filterParamName: 'gene',
    alternativeLabelFieldName: 'accession',
    buttonText: { '=0': 'Genes', '=1': '1 gene', other: '# genes' },
    dropdownItemName: 'Genes',
  },
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'domains$',
    filterParamName: 'domain',
    buttonText: { '=0': 'Domains', '=1': '1 domain', other: '# domains' },
    dropdownItemName: 'Domains',
  },
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'families$',
    filterParamName: 'family',
    buttonText: { '=0': 'Families', '=1': '1 family', other: '# families' },
    dropdownItemName: 'Families',
  },
] as const;

const APP_FILTERS_MAP_BY_PARAM_NAME = indexBy<AppFilter>(APP_FILTERS_LIST, 'filterParamName');
