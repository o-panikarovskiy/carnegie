import { Domain } from 'src/app/search/typings/domain';
import { Family } from 'src/app/search/typings/family';
import { Gene } from 'src/app/search/typings/gene';
import { Protein, ViewParams } from 'src/app/search/typings/table';

export const searchFeatureKey = 'search';

export interface SearchState {
  readonly viewParams: ViewParams;
  readonly genes: readonly Gene[];
  readonly domains: readonly Domain[];
  readonly families: readonly Family[];
  readonly proteins: readonly Protein[];
  readonly proteinsTotal: number;
}
