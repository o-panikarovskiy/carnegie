export { createGeneTable };

const createGeneTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."gene" (
      "id"              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "name"            varchar(255) NOT NULL
    );

    CREATE INDEX IF NOT EXISTS gene_lower_case_name ON "public"."gene" ((lower("name")));
  `;
};
