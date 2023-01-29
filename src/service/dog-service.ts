import { requestError } from "@/errors/request-error";
import dogRepository from "@/repositories/dog-repository";
import userRepository from "@/repositories/user-repository";
import { dogs } from "@prisma/client";

export type CreateDogParams = Omit<dogs, "id" | "createdAt">
export type UpdateDogParams = Omit<dogs, "id" | "createdAt" | "userId">

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

const readDogs = async (): Promise<dogs[]> => {
  const result = await dogRepository.read();

  return result;
};

const readDogById = async (dogId: number): Promise<dogs> => {
  const result = await dogRepository.readById(dogId);

  if (!result) throw requestError("NotFound");

  return result;
};

const updateDog = async (dogId: number, userId: number, { 
  name, 
  age, 
  genre, 
  description, 
  urlImage 
}: UpdateDogParams) => {
  const dogById = await readDogById(dogId);

  if (userId !== dogById.userId) throw requestError("UnauthorizedUserAction");

  const result = await dogRepository.update({
    name, 
    age, 
    genre, 
    description, 
    urlImage,
    userId }, dogId);

  return result;
};

const verifyAccountType = async (userId: number) => {
  const isUserSupporter = await userRepository.findById(userId, { id: true, accountType: true });

  if (isUserSupporter.accountType !== "Apoiador") throw requestError("AccountTypeIsNotAuthorized");
};

const dogService = {
  createDog,
  readDogs,
  readDogById,
  updateDog
};

export default dogService;

