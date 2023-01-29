import { requestError } from "@/errors/request-error";
import postRepository from "@/repositories/post-repository";
import { posts } from "@prisma/client";

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

const postService = {
  createPost,
  readPosts,
  readPostById,
};

export default postService;
