/*
  Warnings:

  - You are about to drop the `Licence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `DomainLicense` DROP FOREIGN KEY `DomainLicense_licenceId_fkey`;

-- DropForeignKey
ALTER TABLE `LicenseToken` DROP FOREIGN KEY `LicenseToken_licenceId_fkey`;

-- DropTable
DROP TABLE `Licence`;

-- CreateTable
CREATE TABLE `License` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(240) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DomainLicense` ADD CONSTRAINT `DomainLicense_licenceId_fkey` FOREIGN KEY (`licenceId`) REFERENCES `License`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LicenseToken` ADD CONSTRAINT `LicenseToken_licenceId_fkey` FOREIGN KEY (`licenceId`) REFERENCES `License`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
