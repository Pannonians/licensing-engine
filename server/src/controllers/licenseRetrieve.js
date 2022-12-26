const prisma = require("../prisma");
const license = prisma.license;

const licenseRetrieve = () => async (req, res, next) => {
  try {
    const reqToken = req.token;
    const pickUpLicensesToken = await license.findUnique({
      where: {
        tokens: { token: reqToken },
      },
      select: {
        name: true,
      },
    });
    if (!pickUpLicensesToken) {
      const reqDomain = req.domain;
      const pickUpLicensesDomain = await license.findUnique({
        where: {
          domain: { name: reqDomain },
        },
        select: {
          name: true,
        },
      });
      if (!pickUpLicensesDomain) {
        throw new Error(
          `no licenses were found for ${reqToken} token or ${reqDomain} domain`
        );
      }
      res.status(200).json(pickUpLicensesDomain);
    }
    res.status(200).json(pickUpLicensesToken);
  } catch {
    res.status(403);
  }
};

module.exports = licenseRetrieve;
