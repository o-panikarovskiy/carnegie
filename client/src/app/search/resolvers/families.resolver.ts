import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Family } from 'src/app/core/typings/family';
import { SearchStoreService } from 'src/app/search/services/store.service';

@Injectable()
export class FamiliesResolver implements Resolve<readonly Family[]> {
  constructor(private readonly store: SearchStoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<readonly Family[]> {
    return this.store.loadFamilies();
  }
}
