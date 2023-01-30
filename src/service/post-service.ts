import { requestError } from "@/errors/request-error";
import postRepository from "@/repositories/post-repository";
import { posts } from "@prisma/client";
import dayjs from "dayjs";

export type CreatePostParams = Omit <posts, "id" | "isUpdated" | "createdAt" | "updatedAt">

const createPost = async ({ title, text, userId }: CreatePostParams): Promise<posts> => {
  const result = await postRepository.create({ title, text, userId });

  return result;
};

const readPosts = async (): Promise<posts[]> => {
  const result = await postRepository.read();

  return result;
};

const readPostById = async (postId: number): Promise<posts> => {
  const result = await postRepository.readById(postId);

  if (!result) throw requestError("NotFoundError");

  return result;
};

const updatePost = async ({ title, text, userId }: CreatePostParams, postId: number): Promise<posts> => {
  const updatedAt = dayjs().toDate();
  const isUpdated = true;
  const isUserPost = await readPostById(postId);

  if(isUserPost.userId !== userId) throw requestError("UnauthorizedUser");

  const result = await postRepository.update({ title, text, updatedAt, isUpdated }, postId);

  return result;
};

const postService = {
  createPost,
  readPosts,
  readPostById,
  updatePost,
};

export default postService;
