export type Paper = {
  readonly id: string;
  readonly title?: string | null;
  readonly abstract?: string | null;
  readonly journal?: string | null;
  readonly volume?: string | null;
  readonly year?: number | null;
  readonly startPage?: number | null;
};
