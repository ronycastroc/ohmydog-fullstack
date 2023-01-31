import { deleteComment, postComment } from "@/controllers/comment-controller";
import { authToken } from "@/middlewares/auth-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { commentSchema } from "@/schemas/comment-schema";
import { Router } from "express";

const commentRouter = Router();

commentRouter
  .post("/:postIdParams", authToken, validateBody(commentSchema), postComment)
  .delete("/:commentId", authToken, deleteComment);

export { commentRouter };
