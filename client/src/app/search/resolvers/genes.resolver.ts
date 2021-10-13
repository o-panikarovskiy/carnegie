import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { Gene } from 'src/app/search/typings/gene';

@Injectable()
export class GenesResolver implements Resolve<readonly Gene[]> {
  constructor(private readonly store: SearchStoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<readonly Gene[]> {
    return this.store.loadGenes();
  }
}
