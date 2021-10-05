import { Action, createReducer, on } from '@ngrx/store';
import { SearchState } from 'src/app/search/store/state';
import * as actions from './actions';

export { searchReducer };

const reducer = createReducer<SearchState>(
  {
    genes: [],
    proteins: [],
    filterParams: {},
  },

  on(actions.setGenesList, (state, { genes }) => ({
    ...state,
    genes,
  })),

  on(actions.setFiltersParams, (state, { filterParams }) => ({
    ...state,
    filterParams,
  })),
);

const searchReducer = (state: SearchState, action: Action): SearchState => {
  return reducer(state, action);
};
