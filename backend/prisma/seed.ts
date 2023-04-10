import prisma from "../src/services/prisma";

async function main() {
  const kalle = await prisma.user.upsert({
    where: {
      name: "Kalle",
    },
    update: {},
    create: {
      name: "Kalle",
      notes: {
        create: [
          {
            title: "Titel för kalle",
            content: "Lite content till kalles notes",
          },
        ],
      },
    },
  });

  const anna = await prisma.user.upsert({
    where: {
      name: "Anna",
    },
    update: {},
    create: {
      name: "Anna",
      notes: {
        create: [
          {
            title: "Titel ett",
            content: "Lite content",
          },
          {
            title: "Titel två",
            content: "Lite mer testcontent",
          },
        ],
      },
    },
  });
  console.log({ kalle, anna });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
