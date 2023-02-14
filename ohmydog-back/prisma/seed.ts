import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as fs from "graceful-fs";

const prisma = new PrismaClient();

const main = async () => {
  const hashPassword = bcrypt.hashSync("123456", 10);

  const dogs = await prisma.dogs.findFirst();
  if (!dogs) {
    const user = await prisma.users.create({
      data: {
        name: "Teste",
        email: "teste@teste.com",
        password: hashPassword,
        urlImage: "https://img.freepik.com/fotos-gratis/lindo-retrato-de-cachorro_23-2149218450.jpg",
        accountType: "Supporter",
      },
    });
    await prisma.dogs.createMany({
      data: [
        { 
          name: "Little Cute", 
          age: "Adolescent", 
          genre: "Male", 
          description: "very cute and playful", 
          urlImage: "https://i0.statig.com.br/bancodeimagens/78/pt/gs/78ptgsfeddfh638dkkzya5p3y.jpg",
          userId: user.id,          
        },
        { 
          name: "Sweetie", 
          age: "Adolescent", 
          genre: "Female", 
          description: "Cute little black and fluffy", 
          urlImage: "https://i0.wp.com/www.portaldodog.com.br/cachorros/wp-content/uploads/2022/03/caracteristicas-do-vira-lata-2.jpg?resize=563%2C422&ssl=1",
          userId: user.id,          
        },
        { 
          name: "Small Butter", 
          age: "Puppy", 
          genre: "Male", 
          description: "Love a little butter", 
          urlImage: "https://pbs.twimg.com/media/EXsqlHzXgAQUQXr.jpg:large",
          userId: user.id,          
        },
        { 
          name: "Yellow", 
          age: "Adolescent", 
          genre: "Female", 
          description: "Yellow and Cute", 
          urlImage: "https://cdn.pixabay.com/photo/2016/07/04/13/58/dog-1496693_1280.jpg",
          userId: user.id,          
        },
        { 
          name: "Black Pink", 
          age: "Puppy", 
          genre: "Female", 
          description: "Back and white and Cute ", 
          urlImage: "https://i.pinimg.com/originals/c9/1f/18/c91f1867554ea891a9ca25b052a18470.jpg",
          userId: user.id,          
        },
        { 
          name: "Little Eye", 
          age: "Adult", 
          genre: "Male", 
          description: "Cute and Cute", 
          urlImage: "https://cachorrosfofos.com.br/wp-content/uploads/2020/08/cachorro-fofo-vira-lata.jpg",
          userId: user.id,          
        },
      ]
    });    
  }
};

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
