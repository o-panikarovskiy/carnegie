import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppFilter } from 'src/app/search/models';
import { APP_FILTERS_LIST } from 'src/app/search/store/filters-list';
import { BaseMultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';
import { StringAnyMap } from 'src/app/typings/common';

export type ItemsType = any[] | StringAnyMap;
export type DataSourceFn = (_: string) => Observable<ItemsType>;
export type DataSource = Observable<ItemsType> | DataSourceFn | null;

@Component({
  selector: 'crng-active-filters-select',
  templateUrl: './active-filters-select.component.html',
  styleUrls: ['./active-filters-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveFiltersSelectComponent extends BaseMultiSelectComponent {
  public items: readonly AppFilter[] = APP_FILTERS_LIST;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
    this.idFieldName = 'filterParamName';
  }

  clickOnItem(item: AppFilter) {
    this.changeSelectedItems(item);
  }

  onMenuOpened() {
    super.onMenuOpened();
  }

  onMenuClosed() {
    super.onMenuClosed();
  }

  protected setItems(items: readonly AppFilter[], selectedIds: readonly string[]) {
    this.items = items;
    this.selectedIds = selectedIds;
    this.setSelectedSet();
  }
}
