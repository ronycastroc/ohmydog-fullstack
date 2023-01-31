import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import commentService from "@/service/comment-service";
import { Response } from "express";
import httpStatus from "http-status";

export const postComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { postIdParams } = req.params;
    const postId = Number(postIdParams);
    const { userId } = req;
    const { comment } = req.body;    

    const result = await commentService.createComment({ userId, postId, comment });

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};
