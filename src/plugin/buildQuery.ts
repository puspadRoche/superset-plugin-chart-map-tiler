import { BuildQuery, QueryFormData } from '@superset-ui/core';

const buildQuery: BuildQuery = (formData: QueryFormData) => ({
  queries: [{
    ...formData,
    columns: [
      (formData as any)['lonColumn'] || 'lon',
      (formData as any)['latColumn'] || 'lat',
      (formData as any)['labelColumn'] || 'name',
    ],
    metrics: [],
    orderby: [],
    filters: [],
    time_range: 'No filter',
  }],
});

export default buildQuery;
