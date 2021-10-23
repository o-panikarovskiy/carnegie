import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { APP_FILTERS_MAP_BY_PARAM_NAME } from 'src/app/search/store/filters-list';
import { FilterParamValue, TableColumn } from 'src/app/search/typings/table';

@Component({
  selector: 'crng-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  readonly filtersMap = APP_FILTERS_MAP_BY_PARAM_NAME;

  constructor(
    private router: Router, //
    private route: ActivatedRoute,
    public readonly store: SearchStoreService,
  ) {}

  updateSearchTerm(value: string) {
    this.applyFilterParam('term', value);
    this.router.navigate(['.'], { queryParams: { term: value }, relativeTo: this.route });
  }

  applyFilterParam(key: string, value: FilterParamValue) {
    this.store.mergeFilters({ [key]: value });
  }

  showColumn(column: TableColumn) {
    this.store.showColumn(column.id);
  }

  hideColumn(column: TableColumn) {
    this.store.hideColumn(column.id);
  }

  identify(index: number, item?: string): string | number {
    return item || index;
  }
}
