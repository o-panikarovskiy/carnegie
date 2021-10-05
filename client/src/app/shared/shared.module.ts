import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [
    MainMenuComponent, //
    MainFooterComponent,
    SearchInputComponent,
  ],
  exports: [
    MainMenuComponent, //
    MainFooterComponent,
    SearchInputComponent,
  ],
  imports: [
    CommonModule, //
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
  ],
})
export class SharedModule {}
