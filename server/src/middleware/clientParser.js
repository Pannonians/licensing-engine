const prisma = require("../prisma");
const domain = prisma.domain;

const clientParser = async (req, res, next) => {
  try {
    const origin = req.headers.origin;

    const clientDomain = await domain.findUnique({
      where: { name: origin },
    });
    if (!clientDomain) {
      throw Error("domain not found");
    }
    req.domain = clientDomain;
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

module.exports = clientParser;
