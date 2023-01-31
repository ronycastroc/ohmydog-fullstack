import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.commentsUncheckedCreateInput) => {
  return prisma.comments.create({
    data,
  });
};

const findById = async (commentId: number) => {
  return prisma.comments.findFirst({
    where: {
      id: commentId
    }
  });
};

const deleteComment = async (commentId: number) => {
  return prisma.comments.delete({
    where: {
      id: commentId,
    }
  });
};

const commentRepository = {
  create,
  deleteComment,
  findById,
};

export default commentRepository;
