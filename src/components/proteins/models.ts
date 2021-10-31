import { ListRequest } from '../../typings/index.js';

export type Protein = {
  readonly id: string;
  readonly uniProtId: string;
  readonly geneId?: string | null;
  readonly domainId?: string | null;
  readonly familyId?: string | null;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly length?: number | null;
  readonly sequence?: string | null;
  readonly species?: string | null;
  readonly isEnzyme?: boolean | null;
};

export type ProteinClient = Protein & {
  readonly gene?: string | null;
  readonly domain?: string | null;
  readonly family?: string | null;
  readonly locMethod?: string | null;
  readonly locOrganelleId?: string | null;
};

export type ProteinRequest = ListRequest & {
  readonly term?: string | null;
  readonly genes?: readonly string[];
  readonly domains?: readonly string[];
  readonly families?: readonly string[];
};

export type NewProtein = Omit<Protein, 'id'>;

export type FiltersSchema = {
  readonly columnName: string;
  readonly filterName: string;
};

export type WhereConditionResult = {
  readonly where: string;
  readonly values: string[];
  readonly conditions: string[];
};
