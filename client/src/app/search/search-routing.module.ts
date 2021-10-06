import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from 'src/app/search/search/search.component';
import { DomainsResolver } from 'src/app/search/services/domains.resolver';
import { FamiliesResolver } from 'src/app/search/services/families.resolver';
import { FilterParamsResolver } from 'src/app/search/services/filter-params.resolver';
import { GenesResolver } from 'src/app/search/services/genes.resolver';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    resolve: {
      genes: GenesResolver,
      domains: DomainsResolver,
      families: FamiliesResolver,
      filterParams: FilterParamsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
