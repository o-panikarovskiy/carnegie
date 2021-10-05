import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FilterParams, Protein } from 'src/app/search/models';
import { DictionariesBackendService } from 'src/app/search/services/dictionaries-backend.service';
import { SearchBackendService } from 'src/app/search/services/search-backend.service';
import { loadProteinsList, loadProteinsListError, loadProteinsListSuccess, setFiltersParams, setGenesList } from 'src/app/search/store/actions';
import { selectFilterParams, selectGenesSelector, selectProteinsSelector } from 'src/app/search/store/selectors';
import { ErrorResponse } from 'src/app/typings/common';
import { Gene } from 'src/app/typings/gene';

@Injectable()
export class StoreService {
  public readonly genes$: Observable<readonly Gene[]>;
  public readonly proteins$: Observable<readonly Protein[]>;
  public readonly filtersParams$: Observable<FilterParams>;

  constructor(
    private readonly store: Store, //
    private readonly sbs: SearchBackendService,
    private readonly dbs: DictionariesBackendService,
  ) {
    this.genes$ = store.select(selectGenesSelector);
    this.proteins$ = store.select(selectProteinsSelector);
    this.filtersParams$ = store.select(selectFilterParams);
  }

  setFilters(filterParams: FilterParams): void {
    this.store.dispatch(setFiltersParams({ filterParams }));
  }

  loadGenes(): Observable<readonly Gene[]> {
    return this.dbs.getGenes().pipe(tap((genes) => this.store.dispatch(setGenesList({ genes }))));
  }

  loadProteins(filterParams: FilterParams): Observable<Protein[]> {
    this.store.dispatch(loadProteinsList({ filterParams }));

    return this.sbs.getProteins().pipe(
      map((proteins) => {
        this.store.dispatch(loadProteinsListSuccess({ proteins }));
        return proteins;
      }),
      catchError((error: ErrorResponse) => {
        console.log(error);
        this.store.dispatch(loadProteinsListError({ error }));
        return throwError(error);
      }),
    );
  }
}
