import commentRepository from "@/repositories/comment-repository";
import { comments } from "@prisma/client";
import postService from "./post-service";

export type CreateCommentParams = Omit<comments, "id" | "createdAt" | "updatedAt">

const createComment = async ({ userId, postId, comment }: CreateCommentParams): Promise<comments> => {
  await postService.readPostById(postId);

  const result = await commentRepository.create({ userId, postId, comment });

  return result;
};

const commentService = {
  createComment,
};

export default commentService;
