-- DropForeignKey
ALTER TABLE `DomainLicense` DROP FOREIGN KEY `DomainLicense_domainId_fkey`;

-- DropForeignKey
ALTER TABLE `DomainLicense` DROP FOREIGN KEY `DomainLicense_licenseId_fkey`;

-- AddForeignKey
ALTER TABLE `DomainLicense` ADD CONSTRAINT `DomainLicense_domainId_fkey` FOREIGN KEY (`domainId`) REFERENCES `Domain`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DomainLicense` ADD CONSTRAINT `DomainLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
