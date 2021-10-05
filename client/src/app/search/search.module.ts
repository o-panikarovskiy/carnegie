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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SearchRoutingModule } from 'src/app/search/search-routing.module';
import { DictionariesBackendService } from 'src/app/search/services/dictionaries-backend.service';
import { FilterParamsResolver } from 'src/app/search/services/filter-params.resolver';
import { GenesResolver } from 'src/app/search/services/genes.resolver';
import { SearchBackendService } from 'src/app/search/services/search-backend.service';
import { searchReducer } from 'src/app/search/store/reducers';
import { searchFeatureKey } from 'src/app/search/store/state';
import { StoreService } from 'src/app/search/store/store.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchFormComponent,
    SearchResultsComponent, //
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
    StoreModule.forFeature(searchFeatureKey, searchReducer),
    EffectsModule.forFeature([]),
  ],
  providers: [
    StoreService, //
    GenesResolver,
    FilterParamsResolver,
    SearchBackendService,
    DictionariesBackendService,
  ],
})
export class SearchModule {}
