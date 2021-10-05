import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Protein } from 'src/app/search/models';
import { StringAnyMap } from 'src/app/typings';

@Injectable()
export class SearchService {
  public readonly params$: Observable<StringAnyMap>;
  public readonly proteins$: Observable<readonly Protein[]>;

  constructor(
    private readonly router: Router, //
    private readonly route: ActivatedRoute,
  ) {
    this.params$ = combineLatest([
      route.params, //
      route.queryParams,
    ]).pipe(
      map(([pathParams, queryParams]) => {
        return { ...queryParams, ...pathParams };
      }),
    );

    this.proteins$ = this.params$.pipe(
      switchMap(() => {
        return of([]);
      }),
    );
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
