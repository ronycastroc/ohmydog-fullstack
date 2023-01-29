import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.postsUncheckedCreateInput) => {
  return prisma.posts.create({
    data,
  });
};

const postRepository = {
  create,
};

export default postRepository;
