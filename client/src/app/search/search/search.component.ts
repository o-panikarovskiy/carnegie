import { Component, OnInit } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ViewSettingsBackendService } from 'src/app/search/services/view-params-backend.service';
import { StoreService } from 'src/app/search/store/store.service';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends Destroyer implements OnInit {
  constructor(
    private store: StoreService, //
    private vsbs: ViewSettingsBackendService,
  ) {
    super();
  }

  ngOnInit() {
    this.store.viewParams$
      .pipe(
        switchMap((viewParams) => this.vsbs.save(viewParams)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
