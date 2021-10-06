import { Component } from '@angular/core';
import { ActiveFilter } from 'src/app/search/models';
import { StoreService } from 'src/app/search/store/store.service';

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

@Component({
  selector: 'crng-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  filtersList = DEFAULT_FILTERS_LIST;

  constructor(public readonly store: StoreService) {}
}
