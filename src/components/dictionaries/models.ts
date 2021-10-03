import { PickRequired } from '../../typings/index.js';

export type Gene = { id: string; name: string };
export type NewGene = PickRequired<Gene, 'name'>;

export type Domain = { id: string; name: string };
export type NewDomain = PickRequired<Domain, 'name'>;

export type Family = { id: string; name: string; description?: string };
export type NewFamily = PickRequired<Family, 'name'>;
