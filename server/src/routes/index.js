const router = require("express").Router();
const prisma = require("../prisma");
const licenseValidation = require("../validations/licenseValidation");
const domainValidation = require("../validations/domainValidation");
const tokenValidation = require("../validations/tokenValidation");
const appValidation = require("../validations/appValidation");
const licenseRetrieve = require("../controllers/licenseRetrieve");
const clientParser = require("../middleware/clientParser");
const tokenRelations = require("../controllers/tokenRelations");
const licenceRelations = require("../controllers/licenceRelations");
const domainLicenseRelations = require("../controllers/domainLicenseRelations");

router.use(
  "/license",
  require("../rdbms/crud")(prisma.license, {
    middleware: {
      create: [licenseValidation],
      readMany: [],
      readOne: [],
      update: [licenseValidation],
      remove: [],
    },
  })
);

router.use(
  "/domain",
  require("../rdbms/crud")(prisma.domain, {
    middleware: {
      create: [domainValidation],
      readMany: [],
      readOne: [],
      update: [domainValidation],
      remove: [],
    },
  })
);

router.use(
  "/token",
  require("../rdbms/crud")(prisma.token, {
    middleware: {
      create: [tokenValidation],
      readMany: [],
      readOne: [],
      update: [tokenValidation],
      remove: [],
    },
  })
);

router.use(
  "/app",
  require("../rdbms/crud")(prisma.app, {
    middleware: {
      create: [appValidation],
      readMany: [],
      readOne: [],
      update: [appValidation],
      remove: [],
    },
  })
);

router.use(
  "/app-token",
  tokenRelations
);

router.use(
  "/token-license",
  licenceRelations
);

router.use(
  "/domain-license",
  domainLicenseRelations
);
router.use("/get-licenses", clientParser, licenseRetrieve);

module.exports = router;
