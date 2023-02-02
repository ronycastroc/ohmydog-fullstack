import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createUser, createPost, createStar } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /comments/:postIdParams", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/comments/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/comments/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/comments/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 422 when body is not given", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });

      const response = await server.post(`/comments/${post.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  
    it("should respond with status 422 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });
  
      const response = await server.post(`/comments/${post.id}`).set("Authorization", `Bearer ${token}`).send(invalidBody);
  
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });


    it("should respond with status 404 when for invalid post id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createPost({ userId: user.id });
      const body = { comment: faker.lorem.text() };

      const response = await server.post("/comments/0").set("Authorization", `Bearer ${token}`).send(body);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    
    it("should respond with status 201 and comment data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });
      const body = { comment: faker.lorem.text() };

      const beforeCount = await prisma.comments.count();

      const response = await server.post(`/comments/${post.id}`).set("Authorization", `Bearer ${token}`).send(body);

      const afterCount = await prisma.comments.count();

      expect(response.status).toBe(httpStatus.CREATED);
      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: user.id,
        postId: post.id,
        comment: body.comment,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});
