import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { FilterParams, Protein } from 'src/app/search/models';
import { DictionariesBackendService } from 'src/app/search/services/dictionaries-backend.service';
import { SearchBackendService } from 'src/app/search/services/search-backend.service';
import {
  loadProteinsList,
  loadProteinsListError,
  loadProteinsListSuccess,
  setDomainsList,
  setFamiliesList,
  setFiltersParams,
  setGenesList
} from 'src/app/search/store/actions';
import { selectDomainsSelector, selectFamiliesSelector, selectFilterParams, selectGenesSelector, selectProteinsSelector } from 'src/app/search/store/selectors';
import { ErrorResponse } from 'src/app/typings/common';
import { Domain } from 'src/app/typings/domain';
import { Family } from 'src/app/typings/family';
import { Gene } from 'src/app/typings/gene';

@Injectable()
export class StoreService {
  public readonly genes$: Observable<readonly Gene[]>;
  public readonly domains$: Observable<readonly Domain[]>;
  public readonly families$: Observable<readonly Family[]>;
  public readonly proteins$: Observable<readonly Protein[]>;
  public readonly filtersParams$: Observable<FilterParams>;

  constructor(
    private readonly store: Store, //
    private readonly sbs: SearchBackendService,
    private readonly dbs: DictionariesBackendService,
  ) {
    this.genes$ = store.select(selectGenesSelector);
    this.domains$ = store.select(selectDomainsSelector);
    this.families$ = store.select(selectFamiliesSelector);
    this.proteins$ = store.select(selectProteinsSelector);
    this.filtersParams$ = store.select(selectFilterParams);
  }

  setFilters(filterParams: FilterParams): void {
    this.store.dispatch(setFiltersParams({ filterParams }));
  }

  updateFilters(updateParams: FilterParams): void {
    this.filtersParams$.pipe(take(1)).subscribe((params) => {
      this.store.dispatch(setFiltersParams({ filterParams: { ...params, ...updateParams } }));
    });
  }

  loadGenes(): Observable<readonly Gene[]> {
    return this.dbs.getGenes().pipe(tap((genes) => this.store.dispatch(setGenesList({ genes }))));
  }

  loadDomains(): Observable<readonly Domain[]> {
    return this.dbs.getDomains().pipe(tap((domains) => this.store.dispatch(setDomainsList({ domains }))));
  }

  loadFamilies(): Observable<readonly Family[]> {
    return this.dbs.getFamilies().pipe(tap((families) => this.store.dispatch(setFamiliesList({ families }))));
  }

  loadProteins(filterParams: FilterParams): Observable<Protein[]> {
    this.store.dispatch(loadProteinsList({ filterParams }));

    return this.sbs.getProteins(filterParams).pipe(
      map((proteins) => {
        this.store.dispatch(loadProteinsListSuccess({ proteins }));
        return proteins;
      }),
      catchError((error: ErrorResponse) => {
        this.store.dispatch(loadProteinsListError({ error }));
        return throwError(error);
      }),
    );
  }
}
