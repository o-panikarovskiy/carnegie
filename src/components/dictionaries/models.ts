export type Gene = { id: string; name: string };
export type NewGene = Omit<Gene, 'id'>;

export type Domain = { id: string; name: string };
export type NewDomain = Omit<Domain, 'id'>;

export type Family = { id: string; name: string; description?: string };
export type NewFamily = Omit<Family, 'id'>;
