const prisma = require("../prisma");
const license = prisma.license;

const licenseRetrieve = async (req, res) => {
  try {
    if (req?.token?.id) {
      const pickUpLicensesToken = await license.findMany({
        where: {
          LicenseTokens: {
            some: {
              tokenId: req.token.id,
              token: {
                active: true
              }
            }
          }
        }
      })

      const licenseNames = pickUpLicensesToken.map((item) => item.name);
      res.status(200).json(licenseNames);
      return
    }
    
    if (req?.domain?.id) {
      const pickUpLicensesDomain = await license.findMany({
        where: {
          DomainLicenses: {
            some: {
              domainId: req.domain.id,
              domain: {
                active: true
              }
            }
          }
        }
      })
      const pickUpLicensesDomainMapped = pickUpLicensesDomain.map((item) => item.name);
      res.status(200).json(pickUpLicensesDomainMapped);
      return
    }
    throw new Error(
      `no licenses were found for ${reqToken} token or ${reqDomain} domain`
    );
  } catch (e) {
    res.status(403);
  }
};

module.exports = licenseRetrieve;
