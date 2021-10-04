export { createProteinsTable };

const createProteinsTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."proteins" (
      "id"              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "name"            varchar(255) NOT NULL,
      "length"          integer,
      "alias"           varchar(255) NULL,
      "sequence"        text NULL,
      "pubmed"          varchar(255) NULL,
      "biochemicalFn"   varchar(255) NULL,
      "biologicalFn"    varchar(255) NULL,
      "enzyme"          boolean NULL,
      "geneId"          uuid NOT NULL,
      "domainId"        uuid NOT NULL,
      "familyId"        uuid NOT NULL,
      CONSTRAINT        "fkgenes" FOREIGN KEY ( "geneId" ) REFERENCES "public"."genes" ( "id" ) ON DELETE CASCADE,
      CONSTRAINT        "fkdomain" FOREIGN KEY ( "domainId" ) REFERENCES "public"."domains" ( "id" ) ON DELETE CASCADE,
      CONSTRAINT        "fkfamily" FOREIGN KEY ( "familyId" ) REFERENCES "public"."families" ( "id" ) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS proteins_lower_case_name ON "public"."proteins" ((lower("name")));
    CREATE INDEX IF NOT EXISTS proteins_lower_case_alias ON "public"."proteins" ((lower("alias")));
  `;
};
