import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { accounts, ages, genres } from "@prisma/client";
import { createUser, createDog } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

const generateValidBody = () => ({
  name: faker.name.firstName(),
  age: ages.Filhote,
  genre: genres.Macho,
  description: faker.lorem.word(),
  urlImage: faker.internet.url(),
});

describe("POST /dogs", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/dogs");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/dogs").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/dogs").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 422 when body is not given", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post("/dogs").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  
    it("should respond with status 422 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const user = await createUser();
      const token = await generateValidToken(user);
  
      const response = await server.post("/dogs").set("Authorization", `Bearer ${token}`).send(invalidBody);
  
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    
    it("should respond with status 400 when when url image is not valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const urlImageInvalid = { 
        name: faker.name.firstName(),
        age: ages.Filhote,
        genre: genres.Macho,
        description: faker.lorem.word(),
        urlImage: faker.lorem.text()
      };
  
      const response = await server.post("/dogs").set("Authorization", `Bearer ${token}`).send(urlImageInvalid);
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 401 when body is valid but account type is not valid", async () => {
      const user = await createUser({ accountType: accounts.Membro });
      const token = await generateValidToken(user);
      const validBody = generateValidBody();
  
      const response = await server.post("/dogs").set("Authorization", `Bearer ${token}`).send(validBody);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 201 and dog data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const dog = generateValidBody();

      const beforeCount = await prisma.dogs.count();

      const response = await server.post("/dogs").set("Authorization", `Bearer ${token}`).send(dog);

      const afterCount = await prisma.dogs.count();

      expect(response.status).toBe(httpStatus.CREATED);
      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: user.id,
        name: dog.name,
        age: dog.age,
        genre: dog.genre,
        description: dog.description,
        urlImage: dog.urlImage,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});

describe("GET /dogs", () => {
  it("should respond with status 200 and dogs data", async () => {
    const user = await createUser();
    await generateValidToken(user);
    const dog = await createDog({ userId: user.id });

    const response = await server.get("/dogs");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: dog.id,
        userId: dog.userId,
        name: dog.name,
        age: dog.age,
        genre: dog.genre,
        description: dog.description,
        urlImage: dog.urlImage,
        createdAt: dog.createdAt.toISOString(),
        updatedAt: dog.updatedAt.toISOString(),
      }
    ]);
  });
});

describe("GET /dogs/:dogId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/dogs/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/dogs/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/dogs/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when for invalid dog id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createDog({ userId: user.id });

      const response = await server.get("/dogs/0").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });   

    it("should respond with status 200 and dog data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const dog = await createDog({ userId: user.id });

      const response = await server.get(`/dogs/${dog.id}`).set("Authorization", `Bearer ${token}`).send(dog);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: dog.id,
        userId: dog.userId,
        name: dog.name,
        age: dog.age,
        genre: dog.genre,
        description: dog.description,
        urlImage: dog.urlImage,
        createdAt: dog.createdAt.toISOString(),
        updatedAt: dog.updatedAt.toISOString(),
      });
    });
  });
});

describe("PUT /dogs/:dogId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.put("/dogs/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.put("/dogs/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.put("/dogs/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 422 when body is not given", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const dog = await createDog({ userId: user.id });

      const response = await server.put(`/dogs/${dog.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  
    it("should respond with status 422 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const user = await createUser();
      const token = await generateValidToken(user);
      const dog = await createDog({ userId: user.id });
  
      const response = await server.put(`/dogs/${dog.id}`).set("Authorization", `Bearer ${token}`).send(invalidBody);
  
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    
    it("should respond with status 400 when when url image is not valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const dog = await createDog({ userId: user.id });
      const urlImageInvalid = { 
        name: faker.name.firstName(),
        age: ages.Filhote,
        genre: genres.Macho,
        description: faker.lorem.word(),
        urlImage: faker.lorem.text()
      };
  
      const response = await server.put(`/dogs/${dog.id}`).set("Authorization", `Bearer ${token}`).send(urlImageInvalid);
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 404 for invalid dog id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createDog({ userId: user.id });
      const dogBody = generateValidBody();

      const response = await server.put("/dogs/0").set("Authorization", `Bearer ${token}`).send(dogBody);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });   

    it("should respond with status 401 when body is valid but account type is not valid", async () => {
      const user = await createUser();
      const user2 = await createUser({ accountType: accounts.Membro });
      const token = await generateValidToken(user2);
      const dog = await createDog({ userId: user.id });
      const dogBody = generateValidBody();

      const response = await server.put(`/dogs/${dog.id}`).set("Authorization", `Bearer ${token}`).send(dogBody);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });   

    it("should respond with status 200 and dog data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const dog = await createDog({ userId: user.id });
      const dogBody = generateValidBody();

      const response = await server.put(`/dogs/${dog.id}`).set("Authorization", `Bearer ${token}`).send(dogBody);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: dog.id,
        userId: dog.userId,
        name: dogBody.name,
        age: dogBody.age,
        genre: dogBody.genre,
        description: dogBody.description,
        urlImage: dogBody.urlImage,
        createdAt: dog.createdAt.toISOString(),
        updatedAt: expect.any(String),
      });
    });
  });
});

describe("DELETE /dogs/:dogId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete("/dogs/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.delete("/dogs/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete("/dogs/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when for invalid dog id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createDog({ userId: user.id });

      const response = await server.delete("/dogs/0").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    
    it("should respond with status 401 when account type is not valid", async () => {
      const user = await createUser();
      const user2 = await createUser({ accountType: accounts.Membro });
      const token = await generateValidToken(user2);
      const dog = await createDog({ userId: user.id });      
  
      const response = await server.delete(`/dogs/${dog.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 200 and delete dog in database", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const dog = await createDog({ userId: user.id });

      const beforeCount = await prisma.dogs.count();

      const response = await server.delete(`/dogs/${dog.id}`).set("Authorization", `Bearer ${token}`).send(dog);

      const afterCount = await prisma.dogs.count();

      expect(response.status).toBe(httpStatus.OK);
      expect(beforeCount).toEqual(1);
      expect(afterCount).toEqual(0);
    });
  });
});

