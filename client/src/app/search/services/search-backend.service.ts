import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FilterParams, ProteinsListResult } from 'src/app/search/models';
import { omitEmptyProps } from 'src/app/shared/utils/app-utils';
import { parseHttpError } from 'src/app/shared/utils/parse-http-error';

@Injectable()
export class SearchBackendService {
  constructor(private readonly http: HttpClient) {}

  getProteinsList(params: FilterParams): Observable<ProteinsListResult> {
    return this.http.post('/api/search/proteins', omitEmptyProps(params)).pipe(
      map((res: any) => res),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }
}
