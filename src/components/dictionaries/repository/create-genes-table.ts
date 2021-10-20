export { createGenesTable };

const createGenesTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."genes" (
      "id"              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "name"            varchar(255) NULL,
      "symbol"          varchar(50) NULL,
      "accession"       varchar(50) NOT NULL UNIQUE
    );

    CREATE INDEX IF NOT EXISTS genes_lower_case_name ON "public"."genes" ((lower("name")));
  `;
};
