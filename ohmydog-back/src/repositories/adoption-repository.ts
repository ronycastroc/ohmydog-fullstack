import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.adoptionFormsUncheckedCreateInput) => {
  return prisma.adoptionForms.create({
    data,
  });
};

const readAdoptionByUserId = async (userId: number) => {
  return prisma.adoptionForms.findFirst({
    where: {
      userId,
    }
  });
};

const adoptionRepository = {
  create,
  readAdoptionByUserId
};

export default adoptionRepository;
