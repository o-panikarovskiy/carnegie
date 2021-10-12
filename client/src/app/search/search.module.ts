import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ActiveFiltersSelectComponent } from 'src/app/search/search-form/filter-select/active-filters-select.component';
import { TableColumnsSelectComponent } from 'src/app/search/search-form/table-columns-select/table-columns-select.component';
import { SearchRoutingModule } from 'src/app/search/search-routing.module';
import { DictionariesBackendService } from 'src/app/search/services/dictionaries-backend.service';
import { DomainsResolver } from 'src/app/search/services/domains.resolver';
import { FamiliesResolver } from 'src/app/search/services/families.resolver';
import { GenesResolver } from 'src/app/search/services/genes.resolver';
import { SearchBackendService } from 'src/app/search/services/search-backend.service';
import { ViewSettingsBackendService } from 'src/app/search/services/view-params-backend.service';
import { ViewParamsResolver } from 'src/app/search/services/view-params.resolver';
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
    TableColumnsSelectComponent,
    ActiveFiltersSelectComponent,
  ],
  imports: [
    CommonModule, //
    DragDropModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature(searchFeatureKey, searchReducer),
    EffectsModule.forFeature([]),
  ],
  providers: [
    StoreService, //
    GenesResolver,
    DomainsResolver,
    FamiliesResolver,
    ViewParamsResolver,
    SearchBackendService,
    ViewSettingsBackendService,
    DictionariesBackendService,
  ],
})
export class SearchModule {}
