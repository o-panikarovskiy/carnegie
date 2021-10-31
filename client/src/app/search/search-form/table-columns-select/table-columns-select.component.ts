import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StringAnyMap } from 'src/app/core/typings/common';
import { TABLE_COLUMNS_LIST } from 'src/app/search/store/columns-list';
import { TableColumn } from 'src/app/search/typings/table';
import { BaseMultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';

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
}
