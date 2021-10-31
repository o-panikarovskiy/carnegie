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
  readonly gene?: string | null;
  readonly domain?: string | null;
  readonly family?: string | null;
  readonly method?: string | null;
  readonly pubMedId?: string | null;
  readonly organelleId?: string | null;
};

export type NewProtein = Omit<Protein, 'id'>;
