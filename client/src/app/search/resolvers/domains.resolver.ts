import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { Domain } from 'src/app/core/typings/domain';

@Injectable()
export class DomainsResolver implements Resolve<readonly Domain[]> {
  constructor(private readonly store: SearchStoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<readonly Domain[]> {
    return this.store.loadDomains();
  }
}
