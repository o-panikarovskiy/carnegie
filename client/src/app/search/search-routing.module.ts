import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainsResolver } from 'src/app/search/resolvers/domains.resolver';
import { FamiliesResolver } from 'src/app/search/resolvers/families.resolver';
import { GenesResolver } from 'src/app/search/resolvers/genes.resolver';
import { ViewParamsResolver } from 'src/app/search/resolvers/view-params.resolver';
import { SearchComponent } from 'src/app/search/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    resolve: {
      genes: GenesResolver,
      domains: DomainsResolver,
      families: FamiliesResolver,
      viewParams: ViewParamsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
