import { faker } from "@faker-js/faker";
import { ages, dogs, genres } from "@prisma/client";
import { prisma } from "@/config";

export const createDog = async (params: Partial<dogs> = {}): Promise<dogs> => {
  return prisma.dogs.create({
    data: {
      name: faker.name.firstName(),
      age: ages.Filhote,
      genre: genres.Macho,
      description: faker.lorem.word(),
      urlImage: faker.internet.url(),
      userId: params.userId,
    },
  });
};
