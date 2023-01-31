import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import starService from "@/service/star-service";
import { Response } from "express";
import httpStatus from "http-status";

export const postStar = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const result = await starService.createStar(Number(postId), userId);

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.message === "StarAlreadyExists") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};
