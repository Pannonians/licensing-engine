const express = require("express");
const prisma = require("../prisma");

module.exports = (LicenseDomain, options) => {
  const readMany = async (req, res, next) => {
    try {
      const licenses = await LicenseDomain.findMany({
        where: {
          domainId: req.body.domainId,
        },
      });

      res.status(200).json(licenses);
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const newItem = await LicenseDomain.create({
        data: {
          domainId: req.body.domainId,
          licenseId: req.body.licenseId,
        },
      });

      res.status(200).json(newItem);
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  // ======
  // Routes
  // ======

  let router = express.Router();

  const actions = {
    create: [...options.middleware.create, create],
    readMany: [...options.middleware.readMany, readMany],
  };

  router.post("/", ...actions.create);
  router.get("/", ...actions.readMany);

  return router;
};
