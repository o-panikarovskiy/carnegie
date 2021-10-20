export type Gene = {
  readonly id: string;
  readonly accession: string;
  readonly name?: string | null;
  readonly symbol?: string | null;
};
