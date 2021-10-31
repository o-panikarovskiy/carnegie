export { createProteinsTable };

const createProteinsTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."proteins" (
      "id"              varchar(50) PRIMARY KEY,
      "geneId"          varchar(50) NULL,
      "domainId"        uuid NULL,
      "familyId"        uuid NULL,
      "name"            varchar(255) NULL,
      "description"     text NULL,
      "length"          integer NULL,
      "sequence"        text NULL,
      "species"         text NULL,
      "isEnzyme"        boolean NULL,
      CONSTRAINT        "fkgenes" FOREIGN KEY ( "geneId" ) REFERENCES "public"."genes" ( "accession" ) ON DELETE CASCADE,
      CONSTRAINT        "fkdomain" FOREIGN KEY ( "domainId" ) REFERENCES "public"."domains" ( "id" ) ON DELETE CASCADE,
      CONSTRAINT        "fkfamily" FOREIGN KEY ( "familyId" ) REFERENCES "public"."families" ( "id" ) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS proteins_lower_case_name ON "public"."proteins" (lower("name"));
    CREATE INDEX IF NOT EXISTS proteins_lower_case_description ON "public"."proteins" (lower("description"));
  `;
};
