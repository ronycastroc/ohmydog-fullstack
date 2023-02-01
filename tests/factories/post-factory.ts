import { faker } from "@faker-js/faker";
import { posts } from "@prisma/client";
import { prisma } from "@/config";

export const createPost = async (params: Partial<posts> = {}): Promise<posts> => {
  return prisma.posts.create({
    data: {
      title: faker.lorem.word(),
      text: faker.lorem.text(),
      userId: params.userId
    },
  });
};
