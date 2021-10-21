import { createAction, props } from '@ngrx/store';
import { AppError } from 'src/app/core/typings/common';
import { Domain } from 'src/app/core/typings/domain';
import { Family } from 'src/app/core/typings/family';
import { Gene } from 'src/app/core/typings/gene';
import { FilterParams, ProteinColumn, ProteinsListResult, ViewParams } from 'src/app/search/typings/table';

export const setGenesList = createAction('[Genes] set list', props<{ genes: readonly Gene[] }>());
export const setDomainsList = createAction('[Domains] set list', props<{ domains: readonly Domain[] }>());
export const setFamiliesList = createAction('[Families] set list', props<{ families: readonly Family[] }>());
export const setViewParams = createAction('[View params] set params', props<ViewParams>());
export const setTableColumns = createAction('[View params] set columns', props<{ columns: readonly ProteinColumn[] }>());
export const mergeFilters = createAction('[View params] merge filters', props<{ filters: FilterParams }>());
export const addTableColumn = createAction('[View params] add col', props<{ column: ProteinColumn }>());
export const delTableColumn = createAction('[View params] del col', props<{ column: ProteinColumn }>());

export const loadProteinsList = createAction('[Proteins] load list', props<{ filterParams: FilterParams }>());
export const loadProteinsListError = createAction('[Proteins] load list error', props<{ error: AppError }>());
export const loadProteinsListSuccess = createAction('[Proteins] load list success', props<ProteinsListResult>());
