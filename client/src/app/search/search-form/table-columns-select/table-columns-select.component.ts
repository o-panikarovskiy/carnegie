import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TableColumn } from 'src/app/search/models';
import { TABLE_COLUMNS_LIST } from 'src/app/search/store/columns-list';
import { BaseMultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';
import { StringAnyMap } from 'src/app/typings/common';

export type ItemsType = any[] | StringAnyMap;
export type DataSourceFn = (_: string) => Observable<ItemsType>;
export type DataSource = Observable<ItemsType> | DataSourceFn | null;

@Component({
  selector: 'crng-table-columns-select',
  templateUrl: './table-columns-select.component.html',
  styleUrls: ['./table-columns-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableColumnsSelectComponent extends BaseMultiSelectComponent {
  public items: readonly TableColumn[] = TABLE_COLUMNS_LIST;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
    this.idFieldName = 'id';
  }

  clickOnItem(item: TableColumn) {
    this.changeSelectedItems(item);
  }

  onMenuOpened() {
    super.onMenuOpened();
  }

  onMenuClosed() {
    super.onMenuClosed();
  }

  protected setItems(items: readonly TableColumn[], selectedIds: readonly string[]) {
    this.items = items;
    this.selectedIds = selectedIds;
    this.setSelectedSet();
  }
}
