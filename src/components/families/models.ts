export type Family = {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
};
export type NewFamily = Omit<Family, 'id'>;
