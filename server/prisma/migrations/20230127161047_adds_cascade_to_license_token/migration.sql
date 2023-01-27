-- DropForeignKey
ALTER TABLE `LicenseToken` DROP FOREIGN KEY `LicenseToken_licenseId_fkey`;

-- DropForeignKey
ALTER TABLE `LicenseToken` DROP FOREIGN KEY `LicenseToken_tokenId_fkey`;

-- AddForeignKey
ALTER TABLE `LicenseToken` ADD CONSTRAINT `LicenseToken_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LicenseToken` ADD CONSTRAINT `LicenseToken_tokenId_fkey` FOREIGN KEY (`tokenId`) REFERENCES `Token`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
