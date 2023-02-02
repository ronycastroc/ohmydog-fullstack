import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createAdoption, createDog, createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /adoptions/:dogIdparams", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/adoptions/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/adoptions/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/adoptions/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 for invalid dog id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createDog({ userId: user.id });

      const response = await server.post("/adoptions/0").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 401 when user already in analysis", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const dog = await createDog({ userId: user.id });
      await createAdoption({ dogId: dog.id, userId: user.id });

      const response = await server.post(`/adoptions/${dog.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    
    it("should respond with status 201 and adoption data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const dog = await createDog({ userId: user.id });

      const beforeCount = await prisma.adoptionForms.count();

      const response = await server.post(`/adoptions/${dog.id}`).set("Authorization", `Bearer ${token}`);

      const afterCount = await prisma.adoptionForms.count();

      expect(response.status).toBe(httpStatus.CREATED);
      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: user.id,
        dogId: dog.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});
