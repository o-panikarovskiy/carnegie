import { StringStringMap, StringTMap } from 'src/app/typings/common';

export type Protein = {
  id: string;
  geneId: string;
  domainId: string;
  familyId: string;
  name: string;
  length: number;
  alias?: string | null;
  sequence?: string | null;
  pubmed?: string | null;
  biochemicalFn?: string | null;
  biologicalFn?: string | null;
  enzyme?: boolean | null;
};

export type NewProtein = Omit<Protein, 'id'>;

export type ActiveFilter = {
  readonly idFieldName: string;
  readonly labelFieldName: string;
  readonly dataSourceName: string;
  readonly selectedIdsName: string;
  readonly buttonText: StringStringMap;
};

export type FilterParams = StringTMap<string | readonly string[]>;
