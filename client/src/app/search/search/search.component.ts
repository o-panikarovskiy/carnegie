import { Component } from '@angular/core';
import { SearchService } from 'src/app/search/search/search.service';

@Component({
  selector: 'crng-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService],
})
export class SearchComponent {
  constructor(public readonly searchService: SearchService) {}
}
