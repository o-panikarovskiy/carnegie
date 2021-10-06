import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FilterParams, Protein } from 'src/app/search/models';
import { parseHttpError } from 'src/app/shared/utils/parse-http-error';

@Injectable()
export class SearchBackendService {
  constructor(private readonly http: HttpClient) {}

  getProteins(params: FilterParams): Observable<Protein[]> {
    return this.http.post('/api/search/proteins', params).pipe(
      map((res: any) => {
        return res.proteins;
      }),
      catchError((res): never => {
        throw parseHttpError(res);
      }),
    );
  }
}
