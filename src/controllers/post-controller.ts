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

export const getPostById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { postId } = req.params;

    const result = await postService.readPostById(Number(postId));

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.message === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

export const updatePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req;
    const { postId } = req.params;
    const { title, text } = req.body;

    const result = await postService.updatePost({ userId, title, text }, Number(postId));

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.message === "UnauthorizedUser") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

export const deletePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req;
    const { postId } = req.params;

    await postService.deletePost(Number(postId), userId);

    res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.message === "UnauthorizedUser") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

