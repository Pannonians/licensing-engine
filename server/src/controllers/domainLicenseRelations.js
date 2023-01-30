const express = require("express");
const prisma = require("../prisma");

const readMany = async (req, res, next) => {
  try {
    const licenses = await prisma.domainLicense.findMany({
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
    const newItem = await prisma.domainLicense.create({
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

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removeItem = await prisma.domainLicense.delete({
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

router.post("/", create);
router.get("/", readMany);
router.delete("/:id", remove);

module.exports = router;
