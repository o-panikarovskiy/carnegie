export { createLocalizationTable };

const createLocalizationTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."localization" (
      "proteinId"            varchar(50) NOT NULL,
      "organelleId"          varchar(50) NOT NULL,
      PRIMARY KEY            ("proteinId", "organelleId"),
      "pubMedId"             varchar(50) NULL,
      "methodId"             varchar(20) NULL,
      CONSTRAINT             "fkmethods" FOREIGN KEY ( "methodId" ) REFERENCES "public"."methods" ( "type" )
    );
  `;
};
