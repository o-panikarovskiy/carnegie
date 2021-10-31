export type Localization = {
  readonly proteinId: string;
  readonly organelleId: string;
  readonly pubMedId?: string | null;
  readonly method?: string | null;
};

export type LocalizationMethod = {
  readonly id: string;
  readonly method: string;
};

export type LocalizationOrganelle = {
  readonly id: string;
  readonly organelle: string;
};
