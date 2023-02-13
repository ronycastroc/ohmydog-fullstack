import { requestError } from "@/errors/request-error";
import starRepository from "@/repositories/star-repository";
import { stars } from "@prisma/client";
import postService from "./post-service";

export type CreateStarParams = Omit<stars, "id" | "createdAt" | "updatedAt">

const createStar = async ({ postId, userId }: CreateStarParams): Promise<stars> => {
  await postService.readPostById(postId);

  const starExists = await starRepository.readByPostUserId(postId, userId);

  if (starExists) throw requestError("StarAlreadyExists");

  const result = await starRepository.create({ postId, userId });

  return result;
};

const deleteStar = async ({ postId, userId }: CreateStarParams) => {
  await postService.readPostById(postId);

  const starExists = await starRepository.readByPostUserId(postId, userId);

  if (!starExists) throw requestError("StarDoesntExists");

  await starRepository.deleteStar(starExists.id);
};

const starService = {
  createStar,
  deleteStar
};

export default starService;
