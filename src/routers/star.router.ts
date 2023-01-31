import { deleteStar, postStar } from "@/controllers/star-controller";
import { authToken } from "@/middlewares/auth-middleware";
import { Router } from "express";

const starRouter = Router();

starRouter
  .post("/:postIdParams", authToken, postStar)
  .delete("/:postIdParams", authToken, deleteStar);

export { starRouter };
