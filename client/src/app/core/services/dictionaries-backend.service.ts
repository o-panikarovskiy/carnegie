import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ListRequest } from 'src/app/core/typings/common';
import { Domain } from 'src/app/core/typings/domain';
import { Family } from 'src/app/core/typings/family';
import { Gene } from 'src/app/core/typings/gene';
import { LocalizationIdVal } from 'src/app/core/typings/localization';
import { parseHttpError } from 'src/app/shared/utils/parse-http-error';

@Injectable()
export class DictionariesBackendService {
  constructor(private readonly http: HttpClient) {}

  getGenes(params?: ListRequest): Observable<readonly Gene[]> {
    return this.http.get('/api/genes/', { params }).pipe(
      map((res: any) => {
        return res.genes;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getDomains(params?: ListRequest): Observable<readonly Domain[]> {
    return this.http.get('/api/domains/', { params }).pipe(
      map((res: any) => {
        return res.domains;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getFamilies(params?: ListRequest): Observable<readonly Family[]> {
    return this.http.get('/api/families/', { params }).pipe(
      map((res: any) => {
        return res.families;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getLocMethods(params?: ListRequest): Observable<readonly LocalizationIdVal[]> {
    return this.http.get('/api/localization/methods', { params }).pipe(
      map((res: any) => {
        return res.list;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getLocOrganelles(params?: ListRequest): Observable<readonly LocalizationIdVal[]> {
    return this.http.get('/api/localization/organelles', { params }).pipe(
      map((res: any) => {
        return res.list;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getLocPubMedIds(params?: ListRequest): Observable<readonly LocalizationIdVal[]> {
    return this.http.get('/api/localization/pubmedids', { params }).pipe(
      map((res: any) => {
        return res.list;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }
}
