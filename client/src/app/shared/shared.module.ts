import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FilterSelectComponent } from 'src/app/shared/filter-select/filter-select.component';
import { MultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [
    MainMenuComponent, //
    MainFooterComponent,
    SearchInputComponent,
    MultiSelectComponent,
    FilterSelectComponent,
  ],
  exports: [
    MainMenuComponent, //
    MainFooterComponent,
    SearchInputComponent,
    MultiSelectComponent,
    FilterSelectComponent,
  ],
  imports: [
    CommonModule, //
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
