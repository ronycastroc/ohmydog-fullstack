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

describe("POST /stars/:postIdParams", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/stars/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/stars/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/stars/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when for invalid post id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createPost({ userId: user.id });

      const response = await server.post("/stars/0").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    
    it("should respond with status 401 when star already exists", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });
      await createStar({ userId: user.id, postId: post.id });

      const response = await server.post(`/stars/${post.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });   

    it("should respond with status 201 and star data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });

      const beforeCount = await prisma.stars.count();

      const response = await server.post(`/stars/${post.id}`).set("Authorization", `Bearer ${token}`);

      const afterCount = await prisma.stars.count();

      expect(response.status).toBe(httpStatus.CREATED);
      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: user.id,
        postId: post.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});

describe("DELETE /stars/:postIdParams", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete("/stars/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.delete("/stars/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete("/stars/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when for invalid post id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createPost({ userId: user.id });

      const response = await server.delete("/stars/0").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    
    it("should respond with status 401 when star doesn't exists", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });      
  
      const response = await server.delete(`/stars/${post.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 200 and delete star in database", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });
      await createStar({ userId: user.id, postId: post.id });

      const beforeCount = await prisma.stars.count();

      const response = await server.delete(`/stars/${post.id}`).set("Authorization", `Bearer ${token}`);

      const afterCount = await prisma.stars.count();

      expect(response.status).toBe(httpStatus.OK);
      expect(beforeCount).toEqual(1);
      expect(afterCount).toEqual(0);
    });
  });
});
