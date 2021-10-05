import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gene } from 'src/app/typings/gene';

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
}
