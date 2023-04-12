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
            title: "Mina memoarer",
            content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Temporibus sed incidunt, voluptate soluta iure dolorum dolores atque quam. 
              Natus, dicta commodi ab esse quod ullam aut possimus corrupti accusantium nobis.`,
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
            title: "Annas jättebra titel",
            content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Temporibus sed incidunt, voluptate soluta iure dolorum dolores atque quam. 
            Natus, dicta commodi ab esse quod ullam aut possimus corrupti accusantium nobis.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Temporibus sed incidunt, voluptate soluta iure dolorum dolores atque quam. 
            Natus, dicta commodi ab esse quod ullam aut possimus corrupti accusantium nobis.`,
          },
          {
            title: "En lite längre bra titel",
            content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Temporibus sed incidunt, voluptate soluta iure dolorum dolores atque quam. 
            Natus, dicta commodi ab esse quod ullam aut possimus corrupti accusantium nobis.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Temporibus sed incidunt, voluptate soluta iure dolorum dolores atque quam. 
            Natus, dicta commodi ab esse quod ullam aut possimus corrupti accusantium nobis.`,
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
