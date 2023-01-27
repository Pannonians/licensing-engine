const express = require("express");
const prisma = require("../prisma");

const readMany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const licenses = await prisma.license.findMany({
      where: {
        LicenseTokens: {
          some: {
            tokenId: id
          }
        }
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
    const newItem = await prisma.licenseToken.create({
      data: {
        tokenId: req.body.tokenId,
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
    const { tokenId, licenseId } = req.params;
    const removeItem = await prisma.licenseToken.delete({
      where: { 
        licenseId_tokenId: {
          licenseId,
          tokenId
        }
       },
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
router.get("/:id", readMany);
router.delete("/:tokenId/:licenseId", remove);

module.exports = router;
