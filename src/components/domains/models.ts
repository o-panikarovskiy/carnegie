export type Domain = {
  readonly id: string;
  readonly name?: string | null;
  readonly iprId?: string | null;
  readonly proteinId?: string | null;
};
export type NewDomain = Omit<Domain, 'id'>;
