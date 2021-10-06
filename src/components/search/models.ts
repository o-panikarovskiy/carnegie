import { ListRequest } from '../../typings/index.js';

export type Protein = {
  readonly id: string;
  readonly geneId: string;
  readonly domainId: string;
  readonly familyId: string;
  readonly name: string;
  readonly length: number;
  readonly alias?: string | null;
  readonly sequence?: string | null;
  readonly pubmed?: string | null;
  readonly biochemicalFn?: string | null;
  readonly biologicalFn?: string | null;
  readonly enzyme?: boolean | null;
};

export type ProteinClient = Protein & {
  readonly gene: string;
  readonly domain: string;
  readonly family: string;
};

export type ProteinRequest = ListRequest & {
  readonly term?: string | null;
  readonly genes?: readonly string[];
  readonly domains?: readonly string[];
  readonly families?: readonly string[];
};

export type NewProtein = Omit<Protein, 'id'>;

export type ConditionParam = {
  readonly columnName: string;
  readonly filterName: string;
};

export type WhereConditionResult = {
  readonly where: string;
  readonly values: string[];
};
