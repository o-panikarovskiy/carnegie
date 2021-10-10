import { Action, createReducer, on } from '@ngrx/store';
import { SearchState } from 'src/app/search/store/state';
import * as actions from './actions';

export { searchReducer };

const reducer = createReducer<SearchState>(
  {
    genes: [],
    domains: [],
    families: [],
    proteins: [],
    viewParams: {
      filters: {},
    },
  },

  on(actions.setGenesList, (state, { genes }) => ({
    ...state,
    genes,
  })),

  on(actions.setDomainsList, (state, { domains }) => ({
    ...state,
    domains,
  })),

  on(actions.setFamiliesList, (state, { families }) => ({
    ...state,
    families,
  })),

  on(actions.loadProteinsListSuccess, (state, { proteins }) => ({
    ...state,
    proteins,
  })),

  on(actions.updateViewParams, (state, viewParams) => ({
    ...state,
    viewParams: {
      filters: {
        ...state.viewParams.filters,
        ...viewParams.filters,
      },
    },
  })),
);

const searchReducer = (state: SearchState, action: Action): SearchState => {
  return reducer(state, action);
};
