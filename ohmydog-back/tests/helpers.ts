import { prisma } from "@/config";
import { users } from "@prisma/client";
import { createUser } from "./factories";
import * as jwt from "jsonwebtoken";
import { createSession } from "./factories/session-factory";

export const cleanDb = async () => {
  await prisma.adoptionForms.deleteMany({});
  await prisma.comments.deleteMany({});
  await prisma.stars.deleteMany({});
  await prisma.posts.deleteMany({});
  await prisma.dogs.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.users.deleteMany({});
};

export const generateValidToken = async (user?: users) => {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
};

