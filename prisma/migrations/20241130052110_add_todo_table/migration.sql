-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL,
    "lastModified" DATETIME NOT NULL
);
