import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewParams } from 'src/app/search/models';
import { ViewSettingsBackendService } from 'src/app/search/services/view-params-backend.service';
import { StoreService } from 'src/app/search/store/store.service';

@Injectable()
export class ViewParamsResolver implements Resolve<ViewParams> {
  constructor(
    private store: StoreService, //
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
