import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FilterParams, Protein, ProteinColumn, ProteinsListResult, ViewParams } from 'src/app/search/models';
import { DictionariesBackendService } from 'src/app/search/services/dictionaries-backend.service';
import { SearchBackendService } from 'src/app/search/services/search-backend.service';
import {
  addTableColumn,
  delTableColumn,
  loadProteinsList,
  loadProteinsListError,
  loadProteinsListSuccess,
  mergeFilters,
  setDomainsList,
  setFamiliesList,
  setGenesList,
  setViewParams
} from 'src/app/search/store/actions';
import {
  selectDomainsSelector,
  selectFamiliesSelector,
  selectGenesSelector,
  selectProteinsSelector,
  selectProteinsTotalSelector,
  selectViewColumns,
  selectViewFilters,
  selectViewParams
} from 'src/app/search/store/selectors';
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
  public readonly proteinsTotal$: Observable<number>;
  public readonly viewParams$: Observable<ViewParams>;
  public readonly filters$: Observable<FilterParams>;
  public readonly columns$: Observable<readonly ProteinColumn[]>;

  constructor(
    private readonly store: Store, //
    private readonly sbs: SearchBackendService,
    private readonly dbs: DictionariesBackendService,
  ) {
    this.genes$ = store.select(selectGenesSelector);
    this.domains$ = store.select(selectDomainsSelector);
    this.families$ = store.select(selectFamiliesSelector);
    this.proteins$ = store.select(selectProteinsSelector);
    this.viewParams$ = store.select(selectViewParams);
    this.filters$ = store.select(selectViewFilters);
    this.columns$ = store.select(selectViewColumns);
    this.proteinsTotal$ = store.select(selectProteinsTotalSelector);
  }

  setViewParams(params: ViewParams): void {
    this.store.dispatch(setViewParams(params));
  }

  mergeFilters(filters: FilterParams): void {
    this.store.dispatch(mergeFilters({ filters }));
  }

  showColumn(column: ProteinColumn): void {
    this.store.dispatch(addTableColumn({ column }));
  }

  hideColumn(column: ProteinColumn): void {
    this.store.dispatch(delTableColumn({ column }));
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

  loadProteins(filterParams: FilterParams): Observable<ProteinsListResult> {
    this.store.dispatch(loadProteinsList({ filterParams }));

    return this.sbs.getProteinsList(filterParams).pipe(
      map((result) => {
        this.store.dispatch(loadProteinsListSuccess(result));
        return result;
      }),
      catchError((error: ErrorResponse) => {
        this.store.dispatch(loadProteinsListError({ error }));
        return throwError(error);
      }),
    );
  }
}
