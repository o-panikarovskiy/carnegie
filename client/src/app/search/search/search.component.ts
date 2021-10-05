import { Component } from '@angular/core';
import { FiltersService } from 'src/app/search/services/filters.service';
import { StoreService } from 'src/app/search/store/store.service';

@Component({
  selector: 'crng-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [FiltersService],
})
export class SearchComponent {
  constructor(
    public readonly store: StoreService, //
    public readonly fs: FiltersService,
  ) {}
}
