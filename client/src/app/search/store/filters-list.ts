import { AppFilter } from 'src/app/search/typings/table';
import { indexBy } from 'src/app/shared/utils/app-utils';

export { APP_FILTERS_LIST, APP_FILTERS_MAP_BY_PARAM_NAME };

const APP_FILTERS_LIST: readonly AppFilter[] = [
  {
    idFieldName: 'accession',
    labelFieldName: 'name',
    dataSourceName: 'loadGenes',
    filterParamName: 'gene',
    alternativeLabelFieldName: 'accession',
    buttonText: { '=0': 'Genes', '=1': '1 gene', other: '# genes' },
    dropdownItemName: 'Genes',
  },
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'loadDomains',
    filterParamName: 'domain',
    buttonText: { '=0': 'Domains', '=1': '1 domain', other: '# domains' },
    dropdownItemName: 'Domains',
  },
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'loadFamilies',
    filterParamName: 'family',
    buttonText: { '=0': 'Families', '=1': '1 family', other: '# families' },
    dropdownItemName: 'Families',
  },
  {
    idFieldName: 'id',
    labelFieldName: 'method',
    dataSourceName: 'loadLocMethods',
    filterParamName: 'locMethod',
    buttonText: { '=0': 'Methods', '=1': '1 method', other: '# methods' },
    dropdownItemName: 'Localization Methods',
  },
  {
    idFieldName: 'id',
    labelFieldName: 'organelle',
    dataSourceName: 'loadOrganelles',
    filterParamName: 'locOrganelle',
    buttonText: { '=0': 'Organelle', '=1': '1 organelle', other: '# organelles' },
    dropdownItemName: 'Localization Organelles',
  },
] as const;

const APP_FILTERS_MAP_BY_PARAM_NAME = indexBy<AppFilter>(APP_FILTERS_LIST, 'filterParamName');
