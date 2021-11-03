import { ListRequest } from '../../typings/index.js';

export type Protein = {
  readonly id: string;
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
  readonly geneName?: string | null;
  readonly domainName?: string | null;
  readonly familyName?: string | null;
  readonly method?: string | null;
  readonly pubMedId?: string | null;
  readonly organelleId?: string | null;
  readonly geneAliases?: string | null;
  readonly proteinAliases?: string | null;
};

export type TableColumn = keyof ProteinClient;

export type ProteinRequest = ListRequest & {
  readonly term?: string | null;
  readonly genes?: readonly string[];
  readonly domains?: readonly string[];
  readonly families?: readonly string[];
  readonly columns?: readonly TableColumn[];
};

export type FiltersSchema = {
  readonly filterName: TableColumn;
  readonly columnName: string;
};

export type ColumnsSchema = {
  readonly columnName: TableColumn;
  readonly aliasName: string;
  readonly isDefault?: boolean;
  readonly alwaysInclude?: boolean;
};

export type SearchSelectConfig = {
  readonly selectedColumns: string[];
  readonly orderByColumns: string[];
};

export type WhereConditionResult = {
  readonly where: string;
  readonly values: string[];
  readonly conditions: string[];
};

export type ProteinsListResult = {
  readonly proteins: readonly ProteinClient[];
  readonly total: number;
};
