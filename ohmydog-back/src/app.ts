import express, { Express } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "@/config";
import { 
  authRouter, 
  dogRouter, 
  userRouter,
  postRouter,
  starRouter,
  commentRouter,
  adoptionRouter
} from "@/routers";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/status", (_req, res) => res.send("OK!"))
  .use("/sign-up", userRouter)
  .use("/sign-in", authRouter)
  .use("/dogs", dogRouter)
  .use("/posts", postRouter)
  .use("/stars", starRouter)
  .use("/comments", commentRouter)
  .use("/adoptions", adoptionRouter);

export const init = (): Promise<Express> => {
  connectDb();
  return Promise.resolve(app);
};

export const close = async (): Promise<void> => {
  await disconnectDB();
};

export default app;
