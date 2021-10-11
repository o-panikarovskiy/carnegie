import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterParamValue, TableColumn } from 'src/app/search/models';
import { APP_FILTERS_MAP_BY_PARAM_NAME } from 'src/app/search/store/filters-list';
import { StoreService } from 'src/app/search/store/store.service';

@Component({
  selector: 'crng-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  readonly activeFilters$: Observable<readonly string[]>;
  readonly filtersMap = APP_FILTERS_MAP_BY_PARAM_NAME;

  constructor(public readonly store: StoreService) {
    this.activeFilters$ = store.viewParams$.pipe(
      map(({ filters }) => {
        return Object.keys(filters).reduce((acc, key) => {
          const filter = APP_FILTERS_MAP_BY_PARAM_NAME.get(key);
          if (filter && filters[key]) {
            acc.push(filter.filterParamName);
          }
          return acc;
        }, [] as string[]);
      }),
    );
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
