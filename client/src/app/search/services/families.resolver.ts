import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/search/store/store.service';
import { Family } from 'src/app/typings/family';

@Injectable()
export class FamiliesResolver implements Resolve<readonly Family[]> {
  constructor(private readonly store: StoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<readonly Family[]> {
    return this.store.loadFamilies();
  }
}
