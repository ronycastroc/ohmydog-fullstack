import { session } from "@prisma/client";
import { prisma } from "@/config";
import { createUser } from "./user-factory";

export async function createSession(token: string): Promise<session> {
  const user = await createUser();

  return prisma.session.create({
    data: {
      token: token,
      userId: user.id,
    },
  });
}
