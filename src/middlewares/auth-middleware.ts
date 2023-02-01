import { prisma } from "@/config";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};

export const authToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return generateUnauthorizedResponse(res);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = await prisma.session.findFirst({
      where: {
        token,
      }
    });

    if (!session) return generateUnauthorizedResponse(res);

    req.userId = userId;
    return next();
  } catch (error) {
    return generateUnauthorizedResponse(res);
  }
};

const generateUnauthorizedResponse = (res: Response) => {
  res.status(httpStatus.UNAUTHORIZED).send("You must be signed in to continue");
};
