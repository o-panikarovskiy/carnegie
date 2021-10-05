import { createAction, props } from '@ngrx/store';
import { FilterParams, Protein } from 'src/app/search/models';
import { ErrorResponse } from 'src/app/typings/common';
import { Gene } from 'src/app/typings/gene';

export const setGenesList = createAction('[Genes] set list', props<{ genes: readonly Gene[] }>());
export const setFiltersParams = createAction('[Filter params] set params', props<{ filterParams: FilterParams }>());

export const loadProteinsList = createAction('[Proteins] load list', props<{ filterParams: FilterParams }>());
export const loadProteinsListError = createAction('[Proteins] load list error', props<{ error: ErrorResponse }>());
export const loadProteinsListSuccess = createAction('[Proteins] load list success', props<{ proteins: readonly Protein[] }>());