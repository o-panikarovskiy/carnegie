import { createFeatureSelector, createSelector } from '@ngrx/store';
import { searchFeatureKey, SearchState } from 'src/app/search/store/state';

export const getSchemeStateSelector = createFeatureSelector<SearchState>(searchFeatureKey);

export const selectGenesSelector = createSelector(getSchemeStateSelector, (state) => state.genes);
export const selectProteinsSelector = createSelector(getSchemeStateSelector, (state) => state.proteins);
export const selectFilterParams = createSelector(getSchemeStateSelector, (state) => state.filterParams);
