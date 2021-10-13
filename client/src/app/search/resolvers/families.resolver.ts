import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { Family } from 'src/app/search/typings/family';

@Injectable()
export class FamiliesResolver implements Resolve<readonly Family[]> {
  constructor(private readonly store: SearchStoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<readonly Family[]> {
    return this.store.loadFamilies();
  }
}
