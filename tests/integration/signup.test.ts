import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { accounts } from "@prisma/client";
import { createUser } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /sign-up", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/sign-up");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/sign-up").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body is valid but account type is not valid", async () => {
    const urlImageInvalid = { 
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(6),
      accountType: faker.lorem.text(),
      urlImage: faker.internet.url()
    };

    const response = await server.post("/sign-up").send(urlImageInvalid);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  
  it("should respond with status 400 when body is valid but url image is not valid", async () => {
    const urlImageInvalid = { 
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(6),
      accountType: accounts.Apoiador,
      urlImage: faker.lorem.text()
    };

    const response = await server.post("/sign-up").send(urlImageInvalid);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(6),
      accountType: accounts.Apoiador,
      urlImage: faker.internet.url()
    });

    it("should respond with status 409 when there is an user with given email", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post("/sign-up").send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 201 and create user when given email is unique", async () => {
      const body = generateValidBody();

      const response = await server.post("/sign-up").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        name: body.name,
        email: body.email,
        accountType: body.accountType,
        urlImage: body.urlImage, 
      });
    });

    it("should not return user password on body", async () => {
      const body = generateValidBody();

      const response = await server.post("/sign-up").send(body);

      expect(response.body).not.toHaveProperty("password");
    });

    it("should save user on db", async () => {
      const body = generateValidBody();

      const response = await server.post("/sign-up").send(body);

      const user = await prisma.users.findUnique({
        where: { email: body.email },
      });
      expect(user).toEqual(
        expect.objectContaining({
          id: response.body.id,
          email: body.email,
          name: body.name,
          accountType: body.accountType,
          urlImage: body.urlImage, 
        }),
      );
    });
  });
});
