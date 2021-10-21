import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Gene } from 'src/app/core/typings/gene';
import { SearchStoreService } from 'src/app/search/services/store.service';

@Injectable()
export class GenesResolver implements Resolve<readonly Gene[]> {
  constructor(private readonly store: SearchStoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<readonly Gene[]> {
    return this.store.loadGenes();
  }
}
