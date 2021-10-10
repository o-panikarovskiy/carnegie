import { Action, createReducer, on } from '@ngrx/store';
import { DEFAULT_TABLE_COLUMNS } from 'src/app/search/store/columns-list';
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
      columns: DEFAULT_TABLE_COLUMNS,
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

  on(actions.updateViewParams, (state, { filters, columns }) => ({
    ...state,
    viewParams: {
      filters: {
        ...state.viewParams.filters,
        ...filters,
      },
      columns: columns ? Array.from(new Set([...state.viewParams.columns, ...columns])) : state.viewParams.columns,
    },
  })),
);

const searchReducer = (state: SearchState, action: Action): SearchState => {
  return reducer(state, action);
};
