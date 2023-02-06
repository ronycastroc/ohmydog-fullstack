import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { accounts, users } from "@prisma/client";
import { prisma } from "@/config";

export const createUser = async (params: Partial<users> = {}): Promise<users> => {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.users.create({
    data: {
      name: faker.name.firstName(),
      email: params.email || faker.internet.email(),
      password: hashPassword,
      accountType: params.accountType || accounts.Supporter,
      urlImage: faker.internet.url()
    },
  });
};
