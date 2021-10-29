export { createLocalizationTable };

const createLocalizationTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."localization" (
      "proteinId"            varchar(50) NOT NULL,
      "organelleId"          varchar(50) NOT NULL,
      PRIMARY KEY            ("proteinId", "organelleId"),
      "pubMedId"             varchar(50) NULL,
      "method"               varchar(25) NULL
    );

    CREATE INDEX IF NOT EXISTS localization_pubMedId ON "public"."localization"("pubMedId");
  `;
};
