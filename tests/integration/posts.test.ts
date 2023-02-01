import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { accounts, ages, genres } from "@prisma/client";
import { createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import { createDog } from "../factories/dog-factory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

const generateValidBody = () => ({
  title: faker.lorem.word(),
  text: faker.lorem.text(),
});

describe("POST /posts", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/posts");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/posts").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/posts").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 422 when body is not given", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post("/posts").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  
    it("should respond with status 422 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const user = await createUser();
      const token = await generateValidToken(user);
  
      const response = await server.post("/posts").set("Authorization", `Bearer ${token}`).send(invalidBody);
  
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 201 and post data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = generateValidBody();

      const beforeCount = await prisma.posts.count();

      const response = await server.post("/posts").set("Authorization", `Bearer ${token}`).send(post);

      const afterCount = await prisma.posts.count();

      expect(response.status).toBe(httpStatus.CREATED);
      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
      expect(response.body).toEqual({
        id: expect.any(Number),
        title: post.title,
        text: post.text,
        userId: user.id,
        isUpdated: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});
