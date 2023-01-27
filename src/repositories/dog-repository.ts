import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.dogsUncheckedCreateInput) => {
  return prisma.dogs.create({
    data,
  });
};

const dogRepository = {
  create,
};

export default dogRepository;
