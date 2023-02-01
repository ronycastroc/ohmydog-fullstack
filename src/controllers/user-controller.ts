import userService, { CreateUserParams } from "@/service/user-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const postUser = async (req: Request, res: Response) => {
  const { name, email, password, urlImage, accountType } = req.body as CreateUserParams;

  try {
    new URL(urlImage);

    const result = await userService.createUser({ name, email, password, urlImage, accountType });

    return res.status(httpStatus.CREATED).send({
      id: result.id,
      name: result.name,
      email: result.email,
      accountType: result.accountType,
      urlImage: result.urlImage, 
    });
  } catch (error) {
    if (error.message === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};
