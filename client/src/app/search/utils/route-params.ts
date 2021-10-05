import { Params } from '@angular/router';
import { FilterParams } from 'src/app/search/models';
import { FILTERS_ARRAY_SET } from 'src/app/search/utils/default-filters';

export { route2Filter, filter2Route };

const route2Filter = (params: Params): FilterParams => {
  return Object.keys(params).reduce((acc, key) => {
    const value = params[key];

    if (FILTERS_ARRAY_SET.has(key)) {
      acc[key] = value?.split(',') || [];
    } else if (value) {
      acc[key] = value || '';
    }

    return acc;
  }, {} as FilterParams);
};

const filter2Route = (filters: FilterParams): Params => {
  return Object.keys(filters).reduce((acc, key) => {
    const value = filters[key];

    if (typeof value === 'string' && value) {
      acc[key] = value;
    } else if (Array.isArray(value) && value.length > 0) {
      acc[key] = value.join(',');
    }

    return acc;
  }, {} as FilterParams);
};
