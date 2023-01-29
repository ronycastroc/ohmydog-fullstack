import { Router } from "express";
import { getDog, getDogs, postDog } from "@/controllers/dog-controller";
import { authToken } from "@/middlewares/auth-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { createDogSchema } from "@/schemas/dog-schema";

const dogRouter = Router();

dogRouter
  .post("/", authToken, validateBody(createDogSchema), postDog)
  .get("/", getDogs)
  .get("/:dogId", authToken, getDog);

export { dogRouter };

