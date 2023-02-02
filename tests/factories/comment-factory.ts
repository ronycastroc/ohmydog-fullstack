import { comments } from "@prisma/client";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export const createComment = async (params: Partial<comments> = {}): Promise<comments> => {
  return prisma.comments.create({
    data: {
      postId: params.postId,
      userId: params.userId,
      comment: faker.lorem.word(),
    },
  });
};
