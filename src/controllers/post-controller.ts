import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import postService from "@/service/post-service";
import { Response } from "express";
import httpStatus from "http-status";

export const postPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, text } = req.body;
    const { userId } = req;

    const result = await postService.createPost({ title, text, userId });

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

export const getPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await postService.readPosts();

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

