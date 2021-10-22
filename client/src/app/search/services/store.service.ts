import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DictionariesBackendService } from 'src/app/core/services/dictionaries-backend.service';
import { AppError, ListRequest } from 'src/app/core/typings/common';
import { Domain } from 'src/app/core/typings/domain';
import { Family } from 'src/app/core/typings/family';
import { Gene } from 'src/app/core/typings/gene';
import { Protein } from 'src/app/core/typings/protein';
import { SearchBackendService } from 'src/app/search/services/search-backend.service';
import {
  addTableColumn,
  delTableColumn,
  loadProteinsList,
  loadProteinsListError,
  loadProteinsListSuccess,
  mergeFilters,
  setTableColumns,
  setViewParams
} from 'src/app/search/store/actions';
import { selectProteinsSelector, selectProteinsTotalSelector, selectViewColumns, selectViewFilters, selectViewParams } from 'src/app/search/store/selectors';
import { FilterParams, ProteinColumn, ProteinsListResult, ViewParams } from 'src/app/search/typings/table';

@Injectable()
export class SearchStoreService {
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

  setTableColumns(columns: readonly ProteinColumn[]): void {
    this.store.dispatch(setTableColumns({ columns }));
  }

  showColumn(column: ProteinColumn): void {
    this.store.dispatch(addTableColumn({ column }));
  }

  hideColumn(column: ProteinColumn): void {
    this.store.dispatch(delTableColumn({ column }));
  }

  loadGenes = (req?: ListRequest): Observable<readonly Gene[]> => {
    return this.dbs.getGenes(req);
  };

  loadDomains = (req?: ListRequest): Observable<readonly Domain[]> => {
    return this.dbs.getDomains(req);
  };

  loadFamilies = (req?: ListRequest): Observable<readonly Family[]> => {
    return this.dbs.getFamilies(req);
  };

  loadProteins = (filterParams: FilterParams): Observable<ProteinsListResult> => {
    this.store.dispatch(loadProteinsList({ filterParams }));

    return this.sbs.getProteinsList(filterParams).pipe(
      map((result) => {
        this.store.dispatch(loadProteinsListSuccess(result));
        return result;
      }),
      catchError((error: AppError) => {
        this.store.dispatch(loadProteinsListError({ error }));
        return throwError(error);
      }),
    );
  };
}
