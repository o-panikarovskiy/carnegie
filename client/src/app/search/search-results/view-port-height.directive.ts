import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Directive({ selector: '[crngTableViewPortHeight]' })
export class TableViewPortHeightDirective extends Destroyer implements AfterViewInit {
  constructor(
    private hostElementRef: ElementRef, //
    private readonly store: SearchStoreService,
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.store.activeFilters$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => this.calculateTableViewPort(), 0);
    });
  }

  private calculateTableViewPort() {
    const host = this.hostElementRef.nativeElement;
    if (!host) return;

    const table: HTMLTableElement = host.querySelector('table');
    if (!table) return;

    const footerHeight = 40;
    const shadowHeight = 12;
    host.style.maxHeight = `calc(100vh - ${table.offsetTop + footerHeight + shadowHeight}px)`;
  }
}
