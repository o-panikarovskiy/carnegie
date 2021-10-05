import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Protein } from 'src/app/search/models';
import { StoreService } from 'src/app/search/store/store.service';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent extends Destroyer implements AfterViewInit {
  displayedColumns: (keyof Protein)[] = ['name', 'alias', 'length', 'enzyme'];
  dataSource = new MatTableDataSource<Protein>();

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  constructor(private readonly store: StoreService) {
    super();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    this.store.filtersParams$
      .pipe(
        switchMap((params) => this.store.loadProteins(params)), //
        takeUntil(this.destroy$),
      )
      .subscribe((proteins) => {
        console.log(proteins);
        this.dataSource = new MatTableDataSource<Protein>(proteins);
      });
  }
}
