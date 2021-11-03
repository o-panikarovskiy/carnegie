export type Protein = {
  readonly id: string;
  readonly accession: string;
  readonly geneId?: string | null;
  readonly geneName?: string | null;
  readonly domainName?: string | null;
  readonly domainInterproId?: string | null;
  readonly familyId?: string | null;
  readonly familyName?: string | null;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly length?: number | null;
  readonly sequence?: string | null;
  readonly species?: string | null;
  readonly isEnzyme?: boolean | null;
  readonly method?: string | null;
  readonly pubMedId?: string | null;
  readonly organelleId?: string | null;
  readonly geneAliases?: string | null;
  readonly proteinAliases?: string | null;
};
