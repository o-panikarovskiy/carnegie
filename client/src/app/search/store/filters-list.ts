import { indexBy } from 'src/app/core/utils/app-utils';
import { AppFilter } from 'src/app/search/typings/table';

export { APP_FILTERS_LIST, APP_FILTERS_MAP_BY_PARAM_NAME };

const APP_FILTERS_LIST: readonly AppFilter[] = [
  {
    idFieldName: 'accession',
    labelFieldName: 'name',
    dataSourceName: 'loadGenes',
    filterParamName: 'geneId',
    alternativeLabelFieldName: 'accession',
    buttonText: { '=0': 'Genes', '=1': '1 gene', other: '# genes' },
    dropdownItemName: 'Genes',
  },
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'loadDomains',
    filterParamName: 'domainId',
    buttonText: { '=0': 'Domains', '=1': '1 domain', other: '# domains' },
    dropdownItemName: 'Domains',
  },
  {
    idFieldName: 'type',
    labelFieldName: 'type',
    dataSourceName: 'loadMethods',
    filterParamName: 'method',
    buttonText: { '=0': 'Methods', '=1': '1 method', other: '# methods' },
    dropdownItemName: 'Methods',
  },
] as const;

const APP_FILTERS_MAP_BY_PARAM_NAME = indexBy<AppFilter>(APP_FILTERS_LIST, 'filterParamName');
