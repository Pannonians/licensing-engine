const express = require("express");
const prisma = require("../prisma");

const readMany = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const tokenList = await prisma.token.findMany({
      where: {
        appId: _id,
      },
    });

    res.status(200).json(tokenList);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newItem = await prisma.token.create({
      data: {
        token: req.body.token,
        active: req.body.active,
        App: {
          connect: { id: req.body.appId },
        },
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

router.post("/", create);
router.get("/:_id", readMany);

module.exports = router;
