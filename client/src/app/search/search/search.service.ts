import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Protein } from 'src/app/search/models';
import { DictionariesService } from 'src/app/search/services/dictionaries.service';
import { StringAnyMap, StringStringMap } from 'src/app/typings';
import { Gene } from 'src/app/typings/gene';

export type ActiveFilter = {
  idFieldName: string;
  labelFieldName: string;
  dataSourceName: string;
  selectedIdsName: string;
  buttonText: StringStringMap;
};

@Injectable()
export class SearchService {
  public readonly params$: Observable<StringAnyMap>;
  public readonly proteins$: Observable<readonly Protein[]>;
  public readonly filters$: Observable<readonly ActiveFilter[]>;

  constructor(
    private readonly router: Router, //
    private readonly route: ActivatedRoute,
    private readonly dictsService: DictionariesService,
  ) {
    this.proteins$ = of([]);

    this.filters$ = of([
      {
        idFieldName: 'id',
        labelFieldName: 'name',
        dataSourceName: 'genes$',
        selectedIdsName: 'genes',
        buttonText: { '=0': 'No genes', '=1': '1 gene', other: '# genes' },
      },
    ]);

    this.params$ = combineLatest([
      route.params, //
      route.queryParams,
    ]).pipe(
      map(([pathParams, queryParams]) => {
        return { ...queryParams, ...pathParams };
      }),
    );
  }

  get genes$(): Observable<readonly Gene[]> {
    return this.dictsService.getGenes();
  }

  applyParams(params: StringAnyMap) {
    const { term, ...queryParams } = params;

    const url = this.router.createUrlTree(['./', term], {
      relativeTo: this.route.parent,
      queryParams,
      queryParamsHandling: 'merge',
    });

    this.router.navigateByUrl(url);
  }
}
