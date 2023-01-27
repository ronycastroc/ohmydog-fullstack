import { requestError } from "@/errors/request-error";
import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type SignInParams = Pick<users, "email" | "password">;

const signIn = async (params: SignInParams) => {
  const { email, password } = params;

  const user = await userRepository.findByEmail(email, { 
    id: true, 
    email: true, 
    password: true, 
    urlImage: true, 
    accountType: true 
  });

  if (!user) throw requestError("email or password are incorrect");

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) throw requestError("email or password are incorrect");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  await sessionRepository.create({
    token,
    userId: user.id
  });

  delete user.password;
  
  return {
    user,
    token
  };
};

const authService = {
  signIn,
};

export default authService;
