import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Protein } from 'src/app/search/models';
import { parseHttpError } from 'src/app/shared/utils/parse-http-error';

@Injectable()
export class SearchBackendService {
  constructor(private readonly http: HttpClient) {}

  getProteins(): Observable<Protein[]> {
    return this.http.get('/api/search/proteins').pipe(
      map((res: any) => {
        return res.proteins;
      }),
      catchError((res): never => {
        throw parseHttpError(res);
      }),
    );
  }
}
