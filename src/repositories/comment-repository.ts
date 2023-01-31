import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.commentsUncheckedCreateInput) => {
  return prisma.comments.create({
    data,
  });
};

const commentRepository = {
  create,
};

export default commentRepository;
