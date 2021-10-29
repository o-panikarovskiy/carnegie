export { createFamiliesTable };

const createFamiliesTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."families" (
      "id"              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "name"            varchar(255) NOT NULL,
      "description"     text NULL
    );

    CREATE INDEX IF NOT EXISTS families_lower_case_name ON "public"."families" (lower("name"));
  `;
};
