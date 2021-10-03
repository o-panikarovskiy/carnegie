import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SearchRoutingModule } from 'src/app/search/search-routing.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [SearchResultsComponent, SearchComponent],
  imports: [
    CommonModule, //
    SearchRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class SearchModule {}