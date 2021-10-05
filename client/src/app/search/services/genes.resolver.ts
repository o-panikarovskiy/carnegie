import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/search/store/store.service';
import { Gene } from 'src/app/typings/gene';

@Injectable()
export class GenesResolver implements Resolve<readonly Gene[]> {
  constructor(private readonly store: StoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<readonly Gene[]> {
    return this.store.loadGenes();
  }
}
