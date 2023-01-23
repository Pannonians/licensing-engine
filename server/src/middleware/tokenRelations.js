const express = require("express");
const prisma = require("../prisma");

module.exports = (Token, options) => {
  const readMany = async (req, res, next) => {
    try {
        const {_id} = req.params
      const tokenList = await Token.findMany({
        where: {
            appId: _id
            
        }
      });

      res.status(200).json(tokenList);
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const newItem = await Token.create({
        data: {
          token: req.body.token,
          active: req.body.active,
          App: {
            connect: { id: req.body.appId },}
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
  router.get("/:_id", ...actions.readMany);

  return router;
};
