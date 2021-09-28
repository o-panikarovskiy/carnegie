import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MainMenuComponent } from 'src/app/main/main-menu/main-menu.component';
import { MainBannerComponent } from './main-banner/main-banner.component';
import { MainFooterComponent } from './main-footer/main-footer.component';

@NgModule({
  declarations: [
    MainMenuComponent, //
    MainBannerComponent,
    MainFooterComponent,
  ],
  exports: [
    MainMenuComponent, //
    MainBannerComponent,
    MainFooterComponent,
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
export class MainModule {}
