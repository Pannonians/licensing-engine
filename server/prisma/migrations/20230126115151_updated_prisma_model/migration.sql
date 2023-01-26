/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Domain` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[licenseId,domainId]` on the table `DomainLicense` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Domain_name_key` ON `Domain`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `DomainLicense_licenseId_domainId_key` ON `DomainLicense`(`licenseId`, `domainId`);
