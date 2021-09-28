import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HomeRoutingModule } from 'src/app/home/home-routing.module';
import { MainModule } from 'src/app/main/main.module';
import { HomeSearchBlockComponent } from './home-search-block/home-search-block.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, HomeSearchBlockComponent],
  imports: [
    CommonModule, //
    MatButtonModule,
    MainModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
