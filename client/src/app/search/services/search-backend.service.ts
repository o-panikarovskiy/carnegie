import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { omitEmptyProps } from 'src/app/core/utils/app-utils';
import { parseHttpError } from 'src/app/core/utils/parse-http-error';
import { FilterParams, ProteinsListResult } from 'src/app/search/typings/table';

@Injectable()
export class SearchBackendService {
  constructor(private readonly http: HttpClient) {}

  getProteinsList(params: FilterParams): Observable<ProteinsListResult> {
    return this.http.post('/api/proteins/', omitEmptyProps(params)).pipe(
      map((res: any) => res),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }
}
