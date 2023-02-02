import { stars } from "@prisma/client";
import { prisma } from "@/config";

export const createStar = async (params: Partial<stars> = {}): Promise<stars> => {
  return prisma.stars.create({
    data: {
      postId: params.postId,
      userId: params.userId
    },
  });
};
