import { adoptionForms } from "@prisma/client";
import { prisma } from "@/config";

export const createAdoption = async (params: Partial<adoptionForms> = {}): Promise<adoptionForms> => {
  return prisma.adoptionForms.create({
    data: {
      dogId: params.dogId,
      userId: params.userId,
    },
  });
};
