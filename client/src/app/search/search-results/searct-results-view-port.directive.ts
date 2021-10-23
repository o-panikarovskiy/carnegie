import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Directive({ selector: '[crngSearchResultsViewPort]' })
export class SearchResultsViewPortDirective extends Destroyer implements AfterViewInit {
  constructor(
    private hostElementRef: ElementRef, //
    private readonly store: SearchStoreService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    const host: HTMLDivElement = this.hostElementRef.nativeElement;
    if (!host) return;

    this.store.activeFilters$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => this.calculateTableViewPort(), 0);
    });

    fromEvent(host, 'scroll')
      .pipe(
        debounceTime(300), //
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.calculateNextPage();
      });
  }

  private calculateNextPage() {
    const host: HTMLDivElement = this.hostElementRef.nativeElement;
    if (!host) return;

    const scrollTop = host.scrollTop;
    const viewHeight = host.offsetHeight;
    const scrollHeight = host.scrollHeight;

    const limit = 0.75;
    const scrollPercent = scrollTop / (scrollHeight - viewHeight);

    if (scrollPercent > limit) {
      console.log('ADD MORE');
    }
  }

  private calculateTableViewPort() {
    const host: HTMLDivElement = this.hostElementRef.nativeElement;
    if (!host) return;

    const table: HTMLTableElement | null = host.querySelector('table');
    if (!table) return;

    const footerHeight = 40;
    const shadowHeight = 12;
    host.style.maxHeight = `calc(100vh - ${table.offsetTop + footerHeight + shadowHeight}px)`;
  }
}
