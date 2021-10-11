import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ViewParams } from 'src/app/search/models';

@Injectable()
export class ViewSettingsBackendService {
  constructor() {}

  save(viewParams: ViewParams): Observable<void> {
    return of();
  }

  load(): Observable<ViewParams> {
    return of({ filters: {}, columns: [] });
  }
}
