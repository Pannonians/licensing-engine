const express = require("express");

module.exports = (Collection, options) => {
  const readMany = async (req, res, next) => {
    try {
      const collectionList = await Collection.findMany();

      res.status(200).json(collectionList);
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  const readOne = async (req, res, next) => {
    try {
      const { _id } = req.params;

      const item = await Collection.findUnique({
        where: {
          id: _id,
        },
      });

      res.status(200).json(item);
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const newItem = await Collection.create({
        data: {
          ...req.body,
        },
      });

      res.status(200).json(newItem);
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const { _id } = req.params;

      const itemExists = await Collection.findUnique({
        where: {
          id: _id,
        },
      });

      if (!itemExists) {
        throw new Error(`Item with id ${_id} not exist`);
      }

      const updatedItem = await Collection.update({
        where: {
          id: _id,
        },
        data: { ...req.body },
      });

      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const { _id } = req.params;

      const deletedItem = await Collection.delete({
        where: {
          id: _id,
        },
      });

      res.status(200).json(deletedItem);
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
    readOne: [...options.middleware.readOne, readOne],
    update: [...options.middleware.update, update],
    remove: [...options.middleware.remove, remove],
  };

  router.post("/", ...actions.create);
  router.get("/", ...actions.readMany);
  router.get("/:_id", ...actions.readOne);
  router.put("/:_id", ...actions.update);
  router.delete("/:_id", ...actions.remove);

  return router;
};
