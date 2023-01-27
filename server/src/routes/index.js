const router = require("express").Router();
const prisma = require("../prisma");
const licenseValidation = require("../validations/licenseValidation");
const domainValidation = require("../validations/domainValidation");
const tokenValidation = require("../validations/tokenValidation");
const appValidation = require("../validations/appValidation");
const licenseRetrieve = require("../controllers/licenseRetrieve");
const clientParser = require("../middleware/clientParser");
const { domainLicense } = require("../prisma");

const license = prisma.license;
const domain = prisma.domain;
const token = prisma.token;
const app = prisma.app;
const licenseToken = prisma.licenseToken;
const licenseDomain = prisma.domainLicense;

router.use(
  "/license",
  require("../rdbms/crud")(license, {
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
  require("../rdbms/crud")(domain, {
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
  require("../rdbms/crud")(token, {
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
  require("../rdbms/crud")(app, {
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
  require("../middleware/tokenRelations")(token, {
    middleware: {
      create: [tokenValidation],
      readMany: [],
    },
  })
);

router.use(
  "/token-license",
  require("../middleware/licenceRelations")(licenseToken, {
    middleware: {
      create: [],
      readMany: [],
      remove: [],
    },
  })
);

router.use(
  "/domain-license",
  require("../middleware/domainLicenseRelations")(licenseDomain, {
    middleware: {
      create: [],
      readMany: [],
    },
  })
);
router.use("/get-licenses", clientParser, licenseRetrieve);

module.exports = router;
