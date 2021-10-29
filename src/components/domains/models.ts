export type Domain = {
  readonly id: string;
  readonly name: string;
};
export type NewDomain = Omit<Domain, 'id'>;
