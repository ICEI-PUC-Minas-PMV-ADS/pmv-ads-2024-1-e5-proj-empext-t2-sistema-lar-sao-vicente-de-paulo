/*
  Warnings:

  - Added the required column `data` to the `registro_antrometrico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registro_antrometrico" ADD COLUMN     "data" DATE NOT NULL;
