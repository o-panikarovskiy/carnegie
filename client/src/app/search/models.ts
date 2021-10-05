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
