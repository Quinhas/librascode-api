/*
  Warnings:

  - Added the required column `is_published` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "is_published" BOOLEAN NOT NULL;
