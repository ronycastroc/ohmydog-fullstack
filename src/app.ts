import express, { Express } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "@/config";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/status", (_req, res) => res.send("OK!"));

export const init = (): Promise<Express> => {
  connectDb();
  return Promise.resolve(app);
};

export const close = async (): Promise<void> => {
  await disconnectDB();
};

export default app;
