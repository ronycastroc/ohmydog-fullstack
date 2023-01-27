import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import dogService from "@/service/dog-service";
import { Response } from "express";
import httpStatus from "http-status";

export const postDog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, age, genre, description, urlImage } = req.body;
    const { userId } = req;

    new URL(urlImage);

    const result = await dogService.createDog({ name, age, genre, description, urlImage, userId });

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.message === "Your account type is not enabled for this action") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};
