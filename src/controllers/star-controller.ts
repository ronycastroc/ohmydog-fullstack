import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import starService from "@/service/star-service";
import { Response } from "express";
import httpStatus from "http-status";

export const postStar = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { postIdParams } = req.params;
    const postId = Number(postIdParams);
    const { userId } = req;

    const result = await starService.createStar({ postId, userId });

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

export const deleteStar = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { postIdParams } = req.params;
    const postId = Number(postIdParams);
    const { userId } = req;

    await starService.deleteStar({ postId, userId });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.message === "StarDoesntExists") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

