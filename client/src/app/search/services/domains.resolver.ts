import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/search/store/store.service';
import { Domain } from 'src/app/typings/domain';

@Injectable()
export class DomainsResolver implements Resolve<readonly Domain[]> {
  constructor(private readonly store: StoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<readonly Domain[]> {
    return this.store.loadDomains();
  }
}
