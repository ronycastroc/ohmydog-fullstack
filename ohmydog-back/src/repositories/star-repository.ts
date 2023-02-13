import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.starsUncheckedCreateInput) => {
  return prisma.stars.create({
    data,
  });
};

const readByPostUserId = async (postId: number, userId: number) => {
  return prisma.stars.findFirst({
    where: {
      postId,
      userId,
    }
  });
};

const deleteStar = async (starId: number) => {
  return prisma.stars.delete({
    where: {
      id: starId,
    }
  });
};

const starRepository = {
  create,
  readByPostUserId,
  deleteStar
};

export default starRepository;
