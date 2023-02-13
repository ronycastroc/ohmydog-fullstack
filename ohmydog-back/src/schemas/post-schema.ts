import { CreatePostParams } from "@/service/post-service";
import joi from "joi";

type CreatePostParamsSchema = Omit<CreatePostParams, "userId">

export const createPostSchema = joi.object<CreatePostParamsSchema>({
  title: joi.string().max(100).required(),
  text: joi.string().required()
});
