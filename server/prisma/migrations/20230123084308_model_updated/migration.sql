/*
  Warnings:

  - You are about to drop the `AppToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AppToken` DROP FOREIGN KEY `AppToken_appId_fkey`;

-- DropForeignKey
ALTER TABLE `AppToken` DROP FOREIGN KEY `AppToken_tokenId_fkey`;

-- DropTable
DROP TABLE `AppToken`;
