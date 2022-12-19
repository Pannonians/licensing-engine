const router = require("express").Router();
const prisma = require("../prisma");

const license = prisma.license;
const domain = prisma.domain;
const token = prisma.token;
const app = prisma.app;

router.use(
  "/license",
  require("../rdbms/crud")(license, {
    middleware: {
      create: [],
      readMany: [],
      readOne: [],
      update: [],
      remove: [],
    },
  })
);

router.use(
  "/domain",
  require("../rdbms/crud")(domain, {
    middleware: {
      create: [],
      readMany: [],
      readOne: [],
      update: [],
      remove: [],
    },
  })
);

router.use(
  "/token",
  require("../rdbms/crud")(token, {
    middleware: {
      create: [],
      readMany: [],
      readOne: [],
      update: [],
      remove: [],
    },
  })
);

router.use(
  "/app",
  require("../rdbms/crud")(app, {
    middleware: {
      create: [],
      readMany: [],
      readOne: [],
      update: [],
      remove: [],
    },
  })
);

module.exports = router;
