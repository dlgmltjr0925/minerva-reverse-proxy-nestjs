-- CreateTable
CREATE TABLE "tester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "scenario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tester_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "scenario_tester_id_fkey" FOREIGN KEY ("tester_id") REFERENCES "tester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tester_id" INTEGER NOT NULL,
    "scenario_id" INTEGER,
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "headers" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    CONSTRAINT "request_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "scenario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tester_id" INTEGER NOT NULL,
    "request_id" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "headers" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "response_time" INTEGER NOT NULL,
    CONSTRAINT "response_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "request" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "response_request_id_key" ON "response"("request_id");
