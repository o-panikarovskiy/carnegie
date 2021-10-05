import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { getSortByString } from 'src/app/shared/utils/sort-utils';
import { StringAnyMap } from 'src/app/typings';

type SortPriority = { selected: any[]; other: any[] };

@Component({
  template: '',
})
export abstract class BaseMultiSelectComponent implements OnChanges, ControlValueAccessor {
  @Input() public items: readonly any[] | Readonly<StringAnyMap> = [];
  @Input() public idFieldName = '';
  @Input() public labelFieldName = '';
  @Input() public selectedIds: readonly string[] = [];
  @Input() public searchVisibleCount = 10;
  @Input() public disabled = false;
  @Input() public disableRipple = false;
  @Input() public searchPlaceholder = 'Search';

  @Output() public opened = new EventEmitter<void>();
  @Output() public closed = new EventEmitter<void>();
  @Output() public selectItem = new EventEmitter<any>();
  @Output() public unselect = new EventEmitter<any>();

  @ViewChild('searchInput') public searchInput?: ElementRef;

  public itemsCount = 0;
  public selectedText = '';
  public filteredItems: Observable<any[]>;
  public selectedSet = new Set<string>();

  public searchControl = new FormControl();

  protected onTouched: () => void = () => {};
  protected onChange: (_: any) => void = (_) => {};

  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    this.filteredItems = this.searchControl.valueChanges.pipe(
      startWith(null),
      distinctUntilChanged(),
      map((searchText) => this.sortItems(this.filterItems(searchText))),
    );
  }

  public get hasSearch(): boolean {
    return this.itemsCount >= this.searchVisibleCount;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this.setItemsCount();
    }

    if (changes.selectedIds) {
      this.setSelectedSet();
    }
  }

  public identify(index: number, item: any): string | number {
    return item?.[this.idFieldName] || index;
  }

  public clickOnItem(item: any, event?: MouseEvent) {
    event?.stopPropagation();
    this.changeSelectedItems(item);
    this.onChange(Array.from(this.selectedSet.keys()));
  }

  public onMenuOpened() {
    this.onTouched();
    this.opened.next();
  }

  public onMenuClosed() {
    this.searchControl.setValue('');
    this.closed.next();
  }

  public writeValue(value: any): void {
    this.selectedIds = value || [];
    this.setSelectedSet();
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected filterItems(searchText: string) {
    const items = this.getItemsAsArray();

    if (!searchText) {
      return items;
    } else {
      const text = searchText.toLowerCase();
      return items.filter((i) => (i[this.labelFieldName] + '').toLowerCase().includes(text));
    }
  }

  protected setItems(items: any[] | StringAnyMap, selectedIds: readonly string[]) {
    this.items = items;
    this.selectedIds = selectedIds || [];
    this.setItemsCount();
    this.setSelectedSet();
  }

  protected setSelectedSet() {
    this.selectedSet = new Set(this.selectedIds);
  }

  protected setItemsCount() {
    const items = this.items;
    this.itemsCount = items ? (Array.isArray(items) ? items.length : Object.keys(items).length) : 0;
  }

  protected changeSelectedItems(item: any) {
    const itemId = item[this.idFieldName];

    if (!this.selectedSet.has(itemId)) {
      this.selectedSet.add(itemId);
      this.selectItem.next(item);
    } else {
      this.selectedSet.delete(itemId);
      this.unselect.next(item);
    }
  }

  protected sortItems(items: any[]): any[] {
    let res: SortPriority;

    if (this.selectedSet.size === 0) {
      res = { selected: [], other: items };
    } else {
      res = items.reduce(
        (acc: SortPriority, item) => {
          if (this.selectedSet.has(item[this.idFieldName])) {
            acc.selected.push(item);
          } else {
            acc.other.push(item);
          }
          return acc;
        },
        { selected: [], other: [] } as SortPriority,
      );
    }

    const sortFn = getSortByString(this.labelFieldName);
    return res.selected.sort(sortFn).concat(res.other);
  }

  protected getItemsAsArray() {
    return Array.isArray(this.items) ? this.items : typeof this.items === 'object' && this.items !== null ? Object.values(this.items) : [];
  }

  protected getSelectedValues() {
    return this.getItemsAsArray().filter((item) => this.selectedSet.has(item[this.idFieldName]));
  }
}

@Component({
  selector: 'crng-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent extends BaseMultiSelectComponent {
  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }
}
