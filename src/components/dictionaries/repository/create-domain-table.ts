export { createDomainTable };

const createDomainTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."domain" (
      "id"              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "name"            varchar(255) NOT NULL
    );

    CREATE INDEX IF NOT EXISTS domain_lower_case_name ON "public"."domain" ((lower("name")));
  `;
};
