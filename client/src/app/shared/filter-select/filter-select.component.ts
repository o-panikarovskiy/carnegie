import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounce, delay, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BaseMultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';
import { StringAnyMap, StringStringMap } from 'src/app/typings';

export type ItemsType = any[] | StringAnyMap;
export type DataSourceFn = (_: string) => Observable<ItemsType>;
export type DataSource = Observable<ItemsType> | DataSourceFn | null;

@Component({
  selector: 'crng-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterSelectComponent),
      multi: true,
    },
  ],
})
export class FilterSelectComponent extends BaseMultiSelectComponent implements OnInit, OnDestroy {
  @Input() public buttonText: StringStringMap = {};
  @Input() public dataSource?: DataSource;

  @Output() public apply = new EventEmitter<readonly string[]>();

  private isApplied = false;
  private isPreloaderShow = false;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  @HostBinding('class.active')
  public get isAnySelect() {
    return this.selectedIds.length > 0;
  }

  public ngOnInit() {
    if (this.dataSource) {
      this.setItems([], this.selectedIds);

      this.filteredItems = this.searchControl.valueChanges.pipe(
        startWith(null),
        debounce((val) => (this.isPreloaderShow ? of(val).pipe(delay(300)) : of(val))),
        distinctUntilChanged(),
        tap(() => (this.isPreloaderShow = true)),
        switchMap((searchText) => this.filterSource(searchText)),
        tap(() => (this.isPreloaderShow = false)),
      );
    }
  }

  public ngOnDestroy() {
    this.dataSource = null;
  }

  public clearSelected(e: MouseEvent) {
    e.stopPropagation();
    this.selectedSet.clear();
  }

  public clearAndApply(e: MouseEvent) {
    e.stopPropagation();
    this.selectedSet.clear();
    this.applyFilters();
  }

  public applyFilters() {
    this.isApplied = true;
    this.selectedIds = Array.from(this.selectedSet.keys());

    this.apply.next(this.selectedIds);
    this.onChange(this.selectedIds);
  }

  public clickOnItem(item: any, event?: MouseEvent) {
    event?.stopPropagation();
    this.changeSelectedItems(item);
  }

  public onMenuOpened() {
    super.onMenuOpened();
    this.isApplied = false;
  }

  public onMenuClosed() {
    super.onMenuClosed();

    if (!this.isApplied) {
      this.setSelectedSet();
    }
  }

  protected setItems(items: readonly any[] | StringAnyMap, selectedIds: readonly string[]) {
    this.items = items;
    this.selectedIds = selectedIds;
    this.setSelectedSet();
  }

  protected filterSource(searchText: string): Observable<any[]> {
    if (typeof this.dataSource === 'function') {
      return this.dataSource(searchText).pipe(
        map((items) => {
          this.setItems(items, this.selectedIds);
          return this.sortItems(Array.isArray(items) ? items : Object.values(items));
        }),
      );
    }

    const obs: Observable<ItemsType> = this.dataSource instanceof Observable ? this.dataSource : of([]);
    return obs.pipe(
      map((items) => {
        this.setItems(items, this.selectedIds);
        return this.sortItems(this.filterItems(searchText));
      }),
    );
  }
}
