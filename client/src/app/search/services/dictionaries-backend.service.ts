import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Domain } from 'src/app/search/typings/domain';
import { Family } from 'src/app/search/typings/family';
import { Gene } from 'src/app/search/typings/gene';

@Injectable()
export class DictionariesBackendService {
  constructor(private readonly http: HttpClient) {}

  getGenes(): Observable<readonly Gene[]> {
    return this.http.get('/api/dicts/genes').pipe(
      map((res: any) => {
        return res.genes;
      }),
    );
  }

  getDomains(): Observable<readonly Domain[]> {
    return this.http.get('/api/dicts/domains').pipe(
      map((res: any) => {
        return res.domains;
      }),
    );
  }

  getFamilies(): Observable<readonly Family[]> {
    return this.http.get('/api/dicts/families').pipe(
      map((res: any) => {
        return res.families;
      }),
    );
  }
}
