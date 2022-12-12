const router = require("express").Router();
const prisma = require("../prisma");

const todo = prisma.todo;

router.use(
  "/todo",
  require("../rdms/crud")(todo, {
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
