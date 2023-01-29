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

  const result = await dogRepository.create({ name, age, genre, description, urlImage, userId });

  return result;
};

const findDogs = async () => {
  const result = await dogRepository.readDogs();

  return result;
};

const verifyAccountType = async (userId: number) => {
  const isUserSupporter = await userRepository.findById(userId, { id: true, accountType: true });

  if (isUserSupporter.accountType !== "Apoiador") throw requestError("AccountTypeIsNotAuthorized");
};

const dogService = {
  createDog,
  findDogs
};

export default dogService;

