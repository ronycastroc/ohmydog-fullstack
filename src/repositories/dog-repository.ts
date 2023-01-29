import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.dogsUncheckedCreateInput) => {
  return prisma.dogs.create({
    data,
  });
};

const read = async () => {
  return prisma.dogs.findMany();
};

const readById = async (dogId: number) => {
  return prisma.dogs.findFirst({
    where: {
      id: dogId
    }
  });
};

const update = async (data: Prisma.dogsUncheckedCreateInput, dogId: number) => {
  return prisma.dogs.update({
    where: {
      id: dogId
    },
    data,
  });
};

const dogRepository = {
  create,
  read,
  readById,
  update
};

export default dogRepository;
