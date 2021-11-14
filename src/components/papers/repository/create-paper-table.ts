export { createPaperTable };

const createPaperTable = (): string => {
  return `
    CREATE TABLE IF NOT EXISTS "public"."papers" (
      "id"              varchar(50) PRIMARY KEY,
      "title"           text NULL,
      "abstract"        text NULL,
      "journal"         text NULL,
      "volume"          varchar(30) NULL,
      "year"            int NULL,
      "startPage"       int NULL
    );

    CREATE INDEX IF NOT EXISTS papers_lower_case_title ON "public"."papers" (lower("title"));
    CREATE INDEX IF NOT EXISTS papers_lower_case_abstract ON "public"."papers" (lower("abstract"));
    CREATE INDEX IF NOT EXISTS papers_lower_case_journal ON "public"."papers" (lower("journal"));
    CREATE INDEX IF NOT EXISTS papers_lower_case_volume ON "public"."papers" (lower("volume"));
  `;
};
