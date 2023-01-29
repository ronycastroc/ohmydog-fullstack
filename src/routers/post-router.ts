import { getPosts, postPost } from "@/controllers/post-controller";
import { authToken } from "@/middlewares/auth-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { createPostSchema } from "@/schemas/post-schema";
import { Router } from "express";

const postRouter = Router();

postRouter
  .post("/", authToken, validateBody(createPostSchema), postPost)
  .get("/", getPosts);

export { postRouter };
