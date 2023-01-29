import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.dogsUncheckedCreateInput) => {
  return prisma.dogs.create({
    data,
  });
};

const readDogs = async () => {
  return prisma.dogs.findMany();
};

const dogRepository = {
  create,
  readDogs
};

export default dogRepository;
