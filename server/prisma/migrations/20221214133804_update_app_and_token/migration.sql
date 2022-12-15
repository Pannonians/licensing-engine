/*
  Warnings:

  - Added the required column `description` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `App` ADD COLUMN `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Token` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false;
