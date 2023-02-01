import { prisma } from "@/config";

export const cleanDb = async () => {
  await prisma.adoptionForms.deleteMany({});
  await prisma.comments.deleteMany({});
  await prisma.stars.deleteMany({});
  await prisma.posts.deleteMany({});
  await prisma.dogs.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.users.deleteMany({});
};

