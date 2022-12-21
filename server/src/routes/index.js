const router = require("express").Router();
const prisma = require("../prisma");
const licenseValidation = require("../validations/licenseValidation");
const domainValidation = require("../validations/domainValidation");
const tokenValidation = require("../validations/tokenValidation");
const appValidation = require("../validations/appValidation");
const errorMiddleware = require("../middleware/error.middleware");

const license = prisma.license;
const domain = prisma.domain;
const token = prisma.token;
const app = prisma.app;

router.use(
  "/license",
  require("../rdbms/crud")(license, {
    middleware: {
      create: [errorMiddleware, licenseValidation],
      readMany: [],
      readOne: [],
      update: [errorMiddleware, licenseValidation],
      remove: [],
    },
  })
);

router.use(
  "/domain",
  require("../rdbms/crud")(domain, {
    middleware: {
      create: [errorMiddleware, domainValidation],
      readMany: [],
      readOne: [],
      update: [errorMiddleware, domainValidation],
      remove: [],
    },
  })
);

router.use(
  "/token",
  require("../rdbms/crud")(token, {
    middleware: {
      create: [errorMiddleware, tokenValidation],
      readMany: [],
      readOne: [],
      update: [errorMiddleware, tokenValidation],
      remove: [],
    },
  })
);

router.use(
  "/app",
  require("../rdbms/crud")(app, {
    middleware: {
      create: [errorMiddleware, appValidation],
      readMany: [],
      readOne: [],
      update: [errorMiddleware, appValidation],
      remove: [],
    },
  })
);

module.exports = router;
