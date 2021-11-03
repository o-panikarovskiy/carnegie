export { createDomainsTable };

const createDomainsTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."domains" (
      "id"              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "name"            varchar(255) NULL,
      "interproId"      varchar(50) NULL,
      "proteinId"       varchar(50) NULL,
      CONSTRAINT        "fkproteins" FOREIGN KEY ( "proteinId" ) REFERENCES "public"."proteins" ( "id" ) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS domains_interpro_id ON "public"."domains" ("interproId");
    CREATE INDEX IF NOT EXISTS domains_lower_case_name ON "public"."domains" (lower("name"));
  `;
};
