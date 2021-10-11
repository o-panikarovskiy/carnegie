import { createAction, props } from '@ngrx/store';
import { FilterParams, ProteinColumn, ProteinsListResult } from 'src/app/search/models';
import { ErrorResponse } from 'src/app/typings/common';
import { Domain } from 'src/app/typings/domain';
import { Family } from 'src/app/typings/family';
import { Gene } from 'src/app/typings/gene';

export const setGenesList = createAction('[Genes] set list', props<{ genes: readonly Gene[] }>());
export const setDomainsList = createAction('[Domains] set list', props<{ domains: readonly Domain[] }>());
export const setFamiliesList = createAction('[Families] set list', props<{ families: readonly Family[] }>());
export const mergeFilters = createAction('[View params] merge filters', props<{ filters: FilterParams }>());
export const addTableColumn = createAction('[View params] add col', props<{ column: ProteinColumn }>());
export const delTableColumn = createAction('[View params] del col', props<{ column: ProteinColumn }>());

export const loadProteinsList = createAction('[Proteins] load list', props<{ filterParams: FilterParams }>());
export const loadProteinsListError = createAction('[Proteins] load list error', props<{ error: ErrorResponse }>());
export const loadProteinsListSuccess = createAction('[Proteins] load list success', props<ProteinsListResult>());
