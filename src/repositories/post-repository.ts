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
      stars: true,
      comments: true,
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

const postRepository = {
  create,
  read
};

export default postRepository;
