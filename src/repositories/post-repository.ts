import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.postsUncheckedCreateInput) => {
  return prisma.posts.create({
    data,
  });
};

const read = async () => {
  return prisma.posts.findMany();
};

const postRepository = {
  create,
  read
};

export default postRepository;
