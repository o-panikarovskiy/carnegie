import { Component, Input } from '@angular/core';
import { ActiveFilter, FilterParams } from 'src/app/search/models';
import { FiltersService } from 'src/app/search/services/filters.service';
import { StoreService } from 'src/app/search/store/store.service';

@Component({
  selector: 'crng-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  @Input() filtersParams: FilterParams = {};
  @Input() filtersList: readonly ActiveFilter[] = [];

  constructor(
    public readonly store: StoreService, //
    private readonly filtersService: FiltersService, //
  ) {}

  applyParam(key: string, value: string | readonly string[]) {
    this.filtersService.applyParams({ ...this.filtersParams, [key]: value });
  }

  identify(index: number, item?: ActiveFilter): string | number {
    return item?.dataSourceName || index;
  }
}
