export { createTagsTable };

const createTagsTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."tags" (
      "id"              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      "key"             varchar(255) NOT NULL,
      "name"            text NOT NULL
    );

    CREATE INDEX IF NOT EXISTS tags_key ON "public"."tags" ("key");
    CREATE INDEX IF NOT EXISTS tags_lower_case_name ON "public"."tags" (lower("name"));
  `;
};
