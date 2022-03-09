/*
  Warnings:

  - You are about to drop the column `scenarioId` on the `request` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "scenario_id" INTEGER,
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "query_param" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "body" TEXT,
    CONSTRAINT "request_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "scenario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_request" ("body", "header", "id", "method", "path", "query_param", "url", "user_id") SELECT "body", "header", "id", "method", "path", "query_param", "url", "user_id" FROM "request";
DROP TABLE "request";
ALTER TABLE "new_request" RENAME TO "request";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
