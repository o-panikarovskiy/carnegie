import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Domain } from 'src/app/search/typings/domain';
import { Family } from 'src/app/search/typings/family';
import { Gene } from 'src/app/search/typings/gene';
import { parseHttpError } from 'src/app/shared/utils/parse-http-error';

@Injectable()
export class DictionariesBackendService {
  constructor(private readonly http: HttpClient) {}

  getGenes(): Observable<readonly Gene[]> {
    return this.http.get('/api/dicts/genes').pipe(
      map((res: any) => {
        return res.genes;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getDomains(): Observable<readonly Domain[]> {
    return this.http.get('/api/dicts/domains').pipe(
      map((res: any) => {
        return res.domains;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getFamilies(): Observable<readonly Family[]> {
    return this.http.get('/api/dicts/families').pipe(
      map((res: any) => {
        return res.families;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }
}
