-- CreateTable
CREATE TABLE "Opinion" (
    "id" SERIAL NOT NULL,
    "pubName" TEXT,
    "content" TEXT,
    "linkUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Opinion_pkey" PRIMARY KEY ("id")
);
