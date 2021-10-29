export { createDomainsTable };

const createDomainsTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."domains" (
      "id"              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "name"            varchar(255) NOT NULL
    );

    CREATE INDEX IF NOT EXISTS domains_lower_case_name ON "public"."domains" (lower("name"));
  `;
};
