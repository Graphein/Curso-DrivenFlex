-- CreateTable
CREATE TABLE "miles" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "miles" INTEGER NOT NULL,

    CONSTRAINT "miles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "miles_code_key" ON "miles"("code");
