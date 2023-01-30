import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.postsUncheckedCreateInput) => {
  return prisma.posts.create({
    data,
  });
};

const read = async () => {
  return prisma.posts.findMany({
    include: {
      _count: {
        select: {
          stars: true,
          comments: true
        }
      }
    },
    orderBy: {
      stars: {
        _count: "desc",
      }
    }
  });
};

const readById = async (postId: number) => {
  return prisma.posts.findFirst({
    where: {
      id: postId,
    },
    include: {
      comments: true,
      _count: {
        select: {
          stars: true
        }
      }
    }
  });
};

const update = async (data: Prisma.postsUncheckedUpdateWithoutUsersInput, postId: number) => {
  return prisma.posts.update({
    where: {
      id: postId,
    },
    data,
  });
};

const postRepository = {
  create,
  read,
  readById,
  update
};

export default postRepository;
