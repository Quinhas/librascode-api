/*
  Warnings:

  - Added the required column `is_published` to the `signs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "module_signs" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "modules" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "signs" ADD COLUMN     "is_published" BOOLEAN NOT NULL,
ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT;
