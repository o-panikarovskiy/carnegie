import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { ViewSettingsBackendService } from 'src/app/search/services/view-params-backend.service';
import { ViewParams } from 'src/app/search/typings/table';

@Injectable()
export class ViewParamsResolver implements Resolve<ViewParams> {
  constructor(
    private store: SearchStoreService, //
    private vsbs: ViewSettingsBackendService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ViewParams> {
    return this.vsbs.load().pipe(
      map(({ filters, columns }) => {
        const queryParams = route.queryParams;

        const viewParams: ViewParams = {
          filters: {
            ...filters,
            ...queryParams,
          },
          columns,
        };

        this.store.setViewParams(viewParams);
        return viewParams;
      }),
    );
  }
}
