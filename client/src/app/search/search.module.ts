import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SearchRoutingModule } from 'src/app/search/search-routing.module';
import { DictionariesService } from 'src/app/search/services/dictionaries.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    SearchResultsComponent, //
    SearchComponent,
    SearchFormComponent,
  ],
  imports: [
    CommonModule, //
    ReactiveFormsModule,
    SearchRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [DictionariesService],
})
export class SearchModule {}
