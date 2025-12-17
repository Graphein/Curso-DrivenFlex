/*
  Warnings:

  - Added the required column `publicationDate` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN     "publicationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
