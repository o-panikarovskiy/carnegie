import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActiveFilter, FilterParams } from 'src/app/search/models';
import { StoreService } from 'src/app/search/store/store.service';
import { DEFAULT_FILTERS_LIST } from 'src/app/search/utils/default-filters';
import { filter2Route } from 'src/app/search/utils/route-params';

@Injectable()
export class FiltersService {
  public readonly filtersList$: Observable<readonly ActiveFilter[]>;

  constructor(
    private readonly router: Router, //
    private readonly route: ActivatedRoute,
    private readonly store: StoreService,
  ) {
    this.filtersList$ = of(DEFAULT_FILTERS_LIST);
  }

  applyParams(filterParams: FilterParams) {
    this.store.setFilters(filterParams);

    const { term = '', ...queryParams } = filter2Route(filterParams);
    const url = this.router.createUrlTree(['./', term], { relativeTo: this.route.parent, queryParams });
    this.router.navigateByUrl(url);
  }
}
