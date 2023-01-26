-- CreateTable
CREATE TABLE `License` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(240) NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `License_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Domain` (
    `id` VARCHAR(191) NOT NULL,
    `name` CHAR(100) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DomainLicense` (
    `id` VARCHAR(191) NOT NULL,
    `domainId` VARCHAR(191) NOT NULL,
    `licenseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LicenseToken` (
    `id` VARCHAR(191) NOT NULL,
    `licenseId` VARCHAR(191) NOT NULL,
    `tokenId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LicenseToken_licenseId_tokenId_key`(`licenseId`, `tokenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` VARCHAR(191) NOT NULL,
    `token` CHAR(64) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `appId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `App` (
    `id` VARCHAR(191) NOT NULL,
    `name` CHAR(100) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DomainLicense` ADD CONSTRAINT `DomainLicense_domainId_fkey` FOREIGN KEY (`domainId`) REFERENCES `Domain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DomainLicense` ADD CONSTRAINT `DomainLicense_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LicenseToken` ADD CONSTRAINT `LicenseToken_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LicenseToken` ADD CONSTRAINT `LicenseToken_tokenId_fkey` FOREIGN KEY (`tokenId`) REFERENCES `Token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_appId_fkey` FOREIGN KEY (`appId`) REFERENCES `App`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
