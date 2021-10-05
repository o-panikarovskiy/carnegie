import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FilterParams } from 'src/app/search/models';
import { route2Filter } from 'src/app/search/utils/route-params';
import { StoreService } from 'src/app/search/store/store.service';

@Injectable()
export class FilterParamsResolver implements Resolve<FilterParams> {
  constructor(private readonly store: StoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): FilterParams {
    const filterParams = route2Filter({ ...route.params, ...route.queryParams });
    this.store.setFilters(filterParams);
    return filterParams;
  }
}
