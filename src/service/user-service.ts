import { requestError } from "@/errors/request-error";
import userRepository from "@/repositories/user-repository";
import { users } from "@prisma/client";
import bcrypt from "bcrypt";

export type CreateUserParams = Omit<users, "id" | "createdAt"> 

const createUser = async ({ name, email, password, urlImage, accountType }: CreateUserParams): Promise<users> => {
  const emailExists = await userRepository.findByEmail(email);

  if (emailExists) throw requestError("DuplicatedEmailError");

  const hashPassword = bcrypt.hashSync(password, 10);

  return userRepository.create({
    password: hashPassword,
    name,
    email,
    urlImage,
    accountType
  });
};

const userService = {
  createUser,
};

export default userService;

