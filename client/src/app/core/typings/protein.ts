export type Protein = {
  readonly uniProtId: string;
  readonly accession: string;
  readonly geneId: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly length?: number | null;
  readonly sequence?: string | null;
  readonly species?: string | null;
  readonly isEnzyme?: boolean | null;
  readonly geneName?: string | null;
  readonly domainName?: string | null;
  readonly domainId?: string | null;
  readonly method?: string | null;
  readonly pubMedId?: string | null;
  readonly organelleId?: string | null;
  readonly geneAliases?: string | null;
  readonly proteinAliases?: string | null;
};
