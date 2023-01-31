import { CreateCommentParams } from "@/service/comment-service";
import joi from "joi";

type CreateCommentParamsSchema = Pick<CreateCommentParams, "comment">

export const commentSchema = joi.object<CreateCommentParamsSchema>({
  comment: joi.string().min(1).max(300).required(),
});
