import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import { createPost } from "../factories/post-factory";

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

describe("GET /posts", () => {
  it("should respond with status 200 and posts data", async () => {
    const user = await createUser();
    await generateValidToken(user);
    const post = await createPost({ userId: user.id });

    const response = await server.get("/posts");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: post.id,
        userId: post.userId,
        title: post.title,
        text: post.text,
        isUpdated: post.isUpdated,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        _count: {
          comments: 0,
          stars: 0,
        }
      }
    ]);
  });
});

describe("GET /posts/:postId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/posts/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/posts/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/posts/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when for invalid post id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createPost({ userId: user.id });

      const response = await server.get("/posts/0").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });   

    it("should respond with status 200 and post data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });

      const response = await server.get(`/posts/${post.id}`).set("Authorization", `Bearer ${token}`).send(post);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: post.id,
        userId: post.userId,
        title: post.title,
        text: post.text,
        isUpdated: post.isUpdated,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        comments: [],
        _count: {
          stars: 0,
        }
      });
    });
  });
});

describe("PUT /posts/:postId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.put("/posts/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.put("/posts/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.put("/posts/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 422 when body is not given", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });

      const response = await server.put(`/posts/${post.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  
    it("should respond with status 422 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });
  
      const response = await server.put(`/posts/${post.id}`).set("Authorization", `Bearer ${token}`).send(invalidBody);
  
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 404 for invalid post id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createPost({ userId: user.id });
      const postBody = generateValidBody();

      const response = await server.put("/posts/1").set("Authorization", `Bearer ${token}`).send(postBody);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });   

    it("should respond with status 401 when body is valid but account type is not valid", async () => {
      const user = await createUser();
      const user2 = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user2.id });
      const postBody = generateValidBody();

      const response = await server.put(`/posts/${post.id}`).set("Authorization", `Bearer ${token}`).send(postBody);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });   

    it("should respond with status 200 and post data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });
      const postBody = generateValidBody();

      const response = await server.put(`/posts/${post.id}`).set("Authorization", `Bearer ${token}`).send(postBody);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: post.id,
        title: postBody.title,
        text: postBody.text,
        userId: user.id,
        isUpdated: true,
        createdAt: post.createdAt.toISOString(),
        updatedAt: expect.any(String),                
      });
    });
  });
});

describe("DELETE /posts/:postId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete("/posts/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.delete("/posts/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete("/posts/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when for invalid post id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createPost({ userId: user.id });

      const response = await server.delete("/posts/0").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    
    it("should respond with status 401 when account type is not valid", async () => {
      const user = await createUser();
      const user2 = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user2.id });      
  
      const response = await server.delete(`/posts/${post.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 200 and delete post in database", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const post = await createPost({ userId: user.id });

      const beforeCount = await prisma.posts.count();

      const response = await server.delete(`/posts/${post.id}`).set("Authorization", `Bearer ${token}`).send(post);

      const afterCount = await prisma.posts.count();

      expect(response.status).toBe(httpStatus.OK);
      expect(beforeCount).toEqual(1);
      expect(afterCount).toEqual(0);
    });
  });
});
