import { postStar } from "@/controllers/start-controller";
import { authToken } from "@/middlewares/auth-middleware";
import { Router } from "express";

const starRouter = Router();

starRouter
  .post("/:postId", authToken, postStar);

export { starRouter };
