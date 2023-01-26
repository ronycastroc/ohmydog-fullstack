import authService, { SignInParams } from "@/service/auth-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const postSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.message === "email or password are incorrect") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
};
