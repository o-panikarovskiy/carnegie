import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ViewParams } from 'src/app/search/typings/table';
import { DEFAULT_TABLE_COLUMNS } from 'src/app/search/store/columns-list';

const storageKey = 'crng:view';

@Injectable()
export class ViewSettingsBackendService {
  constructor() {}

  save(viewParams: ViewParams): Observable<void> {
    window.localStorage.setItem(storageKey, JSON.stringify(viewParams));
    return of();
  }

  load(): Observable<ViewParams> {
    const defViewParams: ViewParams = { filters: {}, columns: DEFAULT_TABLE_COLUMNS };

    let result: ViewParams;
    try {
      const value = window.localStorage.getItem(storageKey);
      result = value ? JSON.parse(value) : defViewParams;
    } catch (error) {
      result = defViewParams;
    }

    return of(result);
  }
}
