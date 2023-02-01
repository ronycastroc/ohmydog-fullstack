import { requestError } from "@/errors/request-error";
import adoptionRepository from "@/repositories/adoption-repository";
import { adoptionForms } from "@prisma/client";
import dogService from "./dog-service";

export type CreateAdoptionParams = Omit<adoptionForms, "id" | "createdAt" | "updatedAt">

const createAdoption = async ({ userId, dogId }: CreateAdoptionParams): Promise<adoptionForms> => {
  await dogService.readDogById(dogId);

  const isUserInAnalysis = await adoptionRepository.readAdoptionByUserId(userId);

  if (isUserInAnalysis) throw requestError("UserAlreadyInAnalysis");

  const result = await adoptionRepository.create({ userId, dogId });

  return result;
};

const adoptionService = {
  createAdoption,
};

export default adoptionService;
