const express = require("express");
const prisma = require("../prisma");

module.exports = (LicenseToken, options) => {
  const readMany = async (req, res, next) => {
    try {
      const licenses = await LicenseToken.findMany({
        where: {
          tokenId: req.body.tokenId,
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
      const newItem = await LicenseToken.create({
        data: {
          tokenId: req.body.tokenId,
          licenseId: req.body.licenseId
        },
      });

      res.status(200).json(newItem);
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const removeItem = await LicenseToken.delete({
        where: { id: id },
      });

      res.status(200).json(removeItem);
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
    remove: [...options.middleware.remove, remove],
  };

  router.post("/", ...actions.create);
  router.get("/", ...actions.readMany);
  router.delete("/:id", ...actions.remove);

  return router;
};
