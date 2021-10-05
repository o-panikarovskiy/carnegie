import { Component, Input } from '@angular/core';
import { SearchService } from 'src/app/search/search/search.service';
import { StringAnyMap } from 'src/app/typings';

@Component({
  selector: 'crng-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  @Input() params: StringAnyMap = {};

  constructor(private readonly searchService: SearchService) {}

  applyParam(key: string, value: string) {
    this.searchService.applyParams({ ...this.params, [key]: value });
  }
}
