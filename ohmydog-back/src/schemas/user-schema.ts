import { CreateUserParams } from "@/service/user-service";
import joi from "joi";

export const createUserSchema = joi.object<CreateUserParams>({
  name: joi.string().min(1).max(50).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(100).required(),
  urlImage: joi.string().required(),
  accountType: joi.string().valid("Member", "Supporter", "Veterinary").required(),
});
