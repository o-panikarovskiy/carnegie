import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FilterParams, ProteinsListResult } from 'src/app/search/typings/table';
import { omitEmptyProps } from 'src/app/shared/utils/app-utils';
import { parseHttpError } from 'src/app/shared/utils/parse-http-error';

@Injectable()
export class SearchBackendService {
  constructor(private readonly http: HttpClient) {}

  getProteinsList(params: FilterParams): Observable<ProteinsListResult> {
    return this.http.post('/api/proteins', omitEmptyProps(params)).pipe(
      map((res: any) => this.parseProteins(res)),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  private parseProteins(res: ProteinsListResult): ProteinsListResult {
    const proteins = res.proteins.map((p) => {
      const locMethodStr = p.locMethod?.join('; ') || '';
      const locOrganelleIdStr = p.locOrganelleId?.join('; ') || '';
      return { ...p, locMethodStr, locOrganelleIdStr };
    });

    return { ...res, proteins };
  }
}
