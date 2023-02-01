import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import adoptionService from "@/service/adoption-service";
import { Response } from "express";
import httpStatus from "http-status";

export const postAdoption = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { dogIdparams } = req.params;
    const dogId = Number(dogIdparams);
    const { userId } = req;

    const result = await adoptionService.createAdoption({ dogId, userId });

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.message === "UserAlreadyInAnalysis") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};
