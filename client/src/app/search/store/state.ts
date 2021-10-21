import { Domain } from 'src/app/core/typings/domain';
import { Family } from 'src/app/core/typings/family';
import { Gene } from 'src/app/core/typings/gene';
import { Protein } from 'src/app/core/typings/protein';
import { ViewParams } from 'src/app/search/typings/table';

export const searchFeatureKey = 'search';

export interface SearchState {
  readonly viewParams: ViewParams;
  readonly genes: readonly Gene[];
  readonly domains: readonly Domain[];
  readonly families: readonly Family[];
  readonly proteins: readonly Protein[];
  readonly proteinsTotal: number;
}
