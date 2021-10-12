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
    proteinsTotal: 0,
    viewParams: {
      filters: {},
      columns: [],
    },
  },

  on(actions.setViewParams, (state, viewParams) => ({
    ...state,
    viewParams,
  })),

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

  on(actions.loadProteinsListSuccess, (state, { proteins, total }) => ({
    ...state,
    proteins,
    proteinsTotal: total,
  })),

  on(actions.mergeFilters, (state, { filters }) => ({
    ...state,
    viewParams: {
      ...state.viewParams,
      filters: {
        ...state.viewParams.filters,
        ...filters,
      },
    },
  })),

  on(actions.addTableColumn, (state, { column }) => ({
    ...state,
    viewParams: {
      ...state.viewParams,
      columns: Array.from(new Set([...state.viewParams.columns, column])),
    },
  })),

  on(actions.delTableColumn, (state, { column }) => ({
    ...state,
    viewParams: {
      ...state.viewParams,
      columns: state.viewParams.columns.filter((c) => c !== column),
    },
  })),
);

const searchReducer = (state: SearchState, action: Action): SearchState => {
  return reducer(state, action);
};
