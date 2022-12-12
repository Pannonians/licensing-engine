const prisma = require("../src/prisma");

const seed = async () => {
  console.log("\n");
  console.log("Seeder is empty. Add any seeds if needed.");
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(`An error occurred: ${error}`);
    await prisma.$disconnect();
    process.exit(1);
  });
