/*
  Warnings:

  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independency_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_url` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "independency_level" TEXT NOT NULL,
ADD COLUMN     "photo_url" TEXT NOT NULL;
