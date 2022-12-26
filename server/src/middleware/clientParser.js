const prisma = require("../prisma");
const domain = prisma.domain;
const token = prisma.token;

  const clientParser = async (req, res, next) => {
    try {
      const sanitizeToken = req.headers.authorization;
      if (!sanitizeToken) {
        const origin = req.headers.origin;
        if (!origin) {
          throw Error("invalid request");
        }
        const clientDomain = await domain.findUnique({
          where: { name: origin },
        });
        if (!clientDomain) {
          throw Error("domain not found");
        }
        req.domain = clientDomain;
        next();
      }
      const tokenStart = 7;
      const sanitizedToken = sanitizeToken.substring(tokenStart, sanitizeToken.length);
      const clientToken = await token.findUnique({
        where: { token: sanitizedToken },
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
