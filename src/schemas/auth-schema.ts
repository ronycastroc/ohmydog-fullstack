import { SignInParams } from "@/service/auth-service";
import joi from "joi";

export const authSchema = joi.object<SignInParams>({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(100).required(),
});
