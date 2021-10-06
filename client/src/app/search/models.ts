import { StringStringMap, StringTMap } from 'src/app/typings/common';

export type Protein = {
  readonly id: string;
  readonly geneId: string;
  readonly gene: string;
  readonly domainId: string;
  readonly domain: string;
  readonly familyId: string;
  readonly family: string;
  readonly name: string;
  readonly length: number;
  readonly alias?: string | null;
  readonly sequence?: string | null;
  readonly pubmed?: string | null;
  readonly biochemicalFn?: string | null;
  readonly biologicalFn?: string | null;
  readonly enzyme?: boolean | null;
};

export type NewProtein = Omit<Protein, 'id'>;

export type ActiveFilter = {
  readonly idFieldName: string;
  readonly labelFieldName: string;
  readonly dataSourceName: string;
  readonly selectedIdsName: string;
  readonly buttonText: StringStringMap;
};

export type FilterParams = StringTMap<string | number | boolean | readonly string[]>;
