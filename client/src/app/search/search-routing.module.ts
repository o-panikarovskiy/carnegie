import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from 'src/app/search/search/search.component';
import { FilterParamsResolver } from 'src/app/search/services/filter-params.resolver';
import { GenesResolver } from 'src/app/search/services/genes.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      genes: GenesResolver,
      filterParams: FilterParamsResolver,
    },
    children: [
      {
        path: '',
        component: SearchComponent,
      },
      {
        path: ':term',
        component: SearchComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
