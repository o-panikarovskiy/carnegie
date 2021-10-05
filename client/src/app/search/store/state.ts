import { FilterParams, Protein } from 'src/app/search/models';
import { Gene } from 'src/app/typings/gene';

export const searchFeatureKey = 'search';

export interface SearchState {
  readonly genes: readonly Gene[];
  readonly filterParams: FilterParams;
  readonly proteins: readonly Protein[];
}
