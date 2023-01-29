import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import dogService from "@/service/dog-service";
import { Response } from "express";
import httpStatus from "http-status";

export const postDog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, age, genre, description, urlImage } = req.body;
    const { userId } = req;

    new URL(urlImage);

    const result = await dogService.createDog({ name, age, genre, description, urlImage, userId });

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.message === "AccountTypeIsNotAuthorized") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

export const getDogs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await dogService.readDogs();

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }  
};

export const getDog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { dogId } = req.params;

    const result = await dogService.readDogById(Number(dogId));

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

export const updateDog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req;
    const { dogId } = req.params;
    const { name, age, genre, description, urlImage } = req.body;

    new URL(urlImage);

    const result = await dogService.updateDog(Number(dogId), userId, {  
      name, 
      age, 
      genre, 
      description, 
      urlImage });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.message === "AccountTypeIsNotAuthorized") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

export const deleteDog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req;
    const { dogId } = req.params;  

    await dogService.deleteDog(Number(dogId), userId);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.message === "AccountTypeIsNotAuthorized") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

