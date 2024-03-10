-- CreateTable
CREATE TABLE "Auth" (
    "id" SERIAL NOT NULL,
    "coockie" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);
