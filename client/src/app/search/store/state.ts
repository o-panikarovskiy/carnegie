import { FilterParams, Protein } from 'src/app/search/models';
import { Domain } from 'src/app/typings/domain';
import { Family } from 'src/app/typings/family';
import { Gene } from 'src/app/typings/gene';

export const searchFeatureKey = 'search';

export interface SearchState {
  readonly genes: readonly Gene[];
  readonly domains: readonly Domain[];
  readonly families: readonly Family[];
  readonly filterParams: FilterParams;
  readonly proteins: readonly Protein[];
}
