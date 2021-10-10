import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Protein } from 'src/app/search/models';
import { ProteinsDataSource } from 'src/app/search/search-results/data-source';
import { StoreService } from 'src/app/search/store/store.service';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent extends Destroyer implements AfterViewInit {
  displayedColumns: (keyof Protein)[] = ['name', 'alias', 'gene', 'domain', 'family', 'length', 'enzyme'];
  readonly dataSource: ProteinsDataSource;

  @ViewChild(MatSort) sort?: MatSort;

  constructor(private readonly store: StoreService) {
    super();
    this.dataSource = new ProteinsDataSource(this.store);
  }

  ngAfterViewInit(): void {
    this.sort?.sortChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const sortCol = this.sort?.active || 'name';
      const sortDir = this.sort?.direction === 'desc' ? '-' : '';
      const sort = sortDir + sortCol;
      this.store.updateFilters({ sort, skip: 0 });
    });

    this.store.viewParams$
      .pipe(
        switchMap((viewParams) => this.store.loadProteins(viewParams.filters)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
