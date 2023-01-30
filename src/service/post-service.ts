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

  await isUnauthorizedUser(postId, userId);

  const result = await postRepository.update({ title, text, updatedAt, isUpdated }, postId);

  return result;
};

const deletePost = async (postId: number, userId: number) => {
  await isUnauthorizedUser(postId, userId);

  await postRepository.deletePost(postId);
};

const isUnauthorizedUser = async (postId: number, userId: number) => {
  const isUserPost = await readPostById(postId);

  if(isUserPost.userId !== userId) throw requestError("UnauthorizedUser");
};

const postService = {
  createPost,
  readPosts,
  readPostById,
  updatePost,
  deletePost
};

export default postService;
