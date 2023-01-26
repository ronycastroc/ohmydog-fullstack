import userService from "@/service/user-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const postUser = async (req: Request, res: Response) => {
  const { name, email, password, urlImage, accountTypeId } = req.body;

  try {
    new URL(urlImage);

    await userService.createUser({ name, email, password, urlImage, accountTypeId });

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error.message === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
};
