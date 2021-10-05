import { Component, Input } from '@angular/core';
import { ActiveFilter, SearchService } from 'src/app/search/search/search.service';
import { DataSource } from 'src/app/shared/filter-select/filter-select.component';
import { StringAnyMap } from 'src/app/typings';

@Component({
  selector: 'crng-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  @Input() params: StringAnyMap = {};
  @Input() filters: readonly ActiveFilter[] = [];

  constructor(
    private readonly searchService: SearchService, //
  ) {}

  applyParam(key: string, value: string) {
    this.searchService.applyParams({ ...this.params, [key]: value });
  }

  getDataSource(name: string): DataSource {
    return (this.searchService as any)[name];
  }

  identify(index: number, item?: ActiveFilter): string | number {
    return item?.dataSourceName || index;
  }
}
