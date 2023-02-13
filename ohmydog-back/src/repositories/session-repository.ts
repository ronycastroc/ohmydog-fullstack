import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.sessionUncheckedCreateInput) => {
  return await prisma.$transaction([
    prisma.session.deleteMany({
      where: {
        userId: data.userId,
      }
    }),
    prisma.session.create({
      data,
    })
  ]); 
};

const sessionRepository = {
  create,
};

export default sessionRepository;
