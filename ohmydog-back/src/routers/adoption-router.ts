import { postAdoption } from "@/controllers/adoption-controller";
import { authToken } from "@/middlewares/auth-middleware";
import { Router } from "express";

const adoptionRouter = Router();

adoptionRouter
  .post("/:dogIdparams", authToken, postAdoption);

export { adoptionRouter };
