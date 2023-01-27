import { requestError } from "@/errors/request-error";
import dogRepository from "@/repositories/dog-repository";
import userRepository from "@/repositories/user-repository";
import { dogs } from "@prisma/client";

export type CreateDogParams = Omit<dogs, "id" | "createdAt">

const createDog = async ({ 
  name, 
  age, 
  genre, 
  description, 
  urlImage, 
  userId 
}: CreateDogParams): Promise<dogs> => {
  await verifyAccountType(userId);

  const dog = await dogRepository.create({ name, age, genre, description, urlImage, userId });

  return dog;
};

const verifyAccountType = async (userId: number) => {
  const isUserSupporter = await userRepository.findById(userId, { id: true, accountType: true });

  if (isUserSupporter.accountType !== "Apoiador") throw requestError("Your account type is not enabled for this action");
};

const dogService = {
  createDog,
};

export default dogService;

