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
    if (error.message === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

export const deleteComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { commentId } = req.params;
    const { userId } = req;    

    await commentService.deleteComment(Number(commentId), userId);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.message === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.message === "UnauthorizedUser") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};
