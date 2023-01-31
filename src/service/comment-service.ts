import { requestError } from "@/errors/request-error";
import commentRepository from "@/repositories/comment-repository";
import { comments } from "@prisma/client";
import postService from "./post-service";

export type CreateCommentParams = Omit<comments, "id" | "createdAt" | "updatedAt">

const createComment = async ({ userId, postId, comment }: CreateCommentParams): Promise<comments> => {
  await postService.readPostById(postId);

  const result = await commentRepository.create({ userId, postId, comment });

  return result;
};

const deleteComment = async (commentId: number, userId: number) => {
  const comment = await commentRepository.findById(commentId);

  if (!comment) throw requestError("NotFoundError");

  if(comment.userId !== userId) throw requestError("UnauthorizedUser");

  await commentRepository.deleteComment(commentId);
};

const commentService = {
  createComment,
  deleteComment
};

export default commentService;
