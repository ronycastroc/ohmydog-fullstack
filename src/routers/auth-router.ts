import { Router } from "express";
import { postSignIn } from "@/controllers/auth-controller";
import { validateBody } from "@/middlewares/validation-middleware";
import { authSchema } from "@/schemas/auth-schema";

const authRouter = Router();

authRouter
  .post("/", validateBody(authSchema), postSignIn);

export { authRouter };
