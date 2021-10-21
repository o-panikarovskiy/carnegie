export type Gene = {
  readonly accession: string;
  readonly name?: string | null;
  readonly symbol?: string | null;
};

export type Domain = {
  readonly id: string;
  readonly name: string;
};
export type NewDomain = Omit<Domain, 'id'>;

export type Family = {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
};
export type NewFamily = Omit<Family, 'id'>;
