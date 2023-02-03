const prisma = require("../prisma");
const license = prisma.license;

const licenseRetrieve = async (req, res) => {
  try {
    if (req?.token?.id) {
      const app = await prisma.app.findFirst({
        where: {
          active: true,
          tokens: {
            some: {
              LicenseTokens: {
                some: {
                  tokenId: req.token.id,
                },
              },
            },
          },
        },
      });
      if (!app) {
        throw new Error("token not found");
      }
      const pickUpLicensesToken = await license.findMany({
        where: {
          LicenseTokens: {
            some: {
              tokenId: req.token.id,
              token: {
                App: {
                  active: true,
                },
                active: true,
              },
            },
          },
        },
      });

      const licenseNames = pickUpLicensesToken.map((item) => item.name);
      res.status(200).json({ licenses: licenseNames });
      return;
    }

    if (req?.domain?.id) {
      const pickUpLicensesDomain = await license.findMany({
        where: {
          DomainLicenses: {
            some: {
              domainId: req.domain.id,
              domain: {
                active: true,
              },
            },
          },
        },
      });
      const pickUpLicensesDomainMapped = pickUpLicensesDomain.map(
        (item) => item.name
      );
      res.status(200).json({ licenses: pickUpLicensesDomainMapped });
      return;
    }
    throw new Error(
      `no licenses were found for ${reqToken} token or ${reqDomain} domain`
    );
  } catch (e) {
    res.status(403).json(e);
  }
};

module.exports = licenseRetrieve;
