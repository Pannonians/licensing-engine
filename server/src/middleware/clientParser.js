const prisma = require("../prisma");
const domain = prisma.domain;
const token = prisma.token;

const clientParser = async (req, res, next) => {
  try {
    const sanitizeToken = req.headers.authorization;
    if (!sanitizeToken || (sanitizeToken && sanitizeToken.includes("Basic"))) {
      const host = req.headers.host;

      if (!host) {
        throw Error("invalid request");
      }
      const clientDomain = await domain.findFirst({
        where: { name: host, active: true },
      });
      if (!clientDomain) {
        throw Error("domain not found");
      }
      req.domain = clientDomain;
      next();
      return
    }
    const sanitizedToken = sanitizeToken.replace("Bearer", "").trim();
    const clientToken = await token.findFirst({
      where: { token: sanitizedToken, active: true },
    });
    if (!clientToken) {
      throw Error("token not found");
    }
    req.token = clientToken;
    next();
  } catch (error) {
    res.status(403);
    next(error);
  }
};

module.exports = clientParser;
