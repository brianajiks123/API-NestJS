import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe("POST /api/users", () => {
    beforeEach(async () => {
      await testService.deleteUser();
    });

    it("should be rejected if request is invalid", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/users")
        .send({
          username: "",
          password: "",
          name: ""
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it("should be able to register", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/users")
        .send({
          username: "test1",
          password: "test1",
          name: "test1"
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test1");
      expect(response.body.data.name).toBe("test1");
    });

    it("should be rejected if username already exists", async () => {
      await testService.createUser();
      
      const response = await request(app.getHttpServer())
        .post("/api/users")
        .send({
          username: "test1",
          password: "test1",
          name: "test1"
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
  
  describe("POST /api/users/login", () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it("should be rejected if request is invalid", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/users/login")
        .send({
          username: "",
          password: "",
          name: ""
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it("should be able to login", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/users/login")
        .send({
          username: "test1",
          password: "test1",
          name: "test1"
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test1");
      expect(response.body.data.name).toBe("test1");
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe("GET /api/users/current", () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it("should be rejected if token is invalid", async () => {
      const response = await request(app.getHttpServer())
        .get("/api/users/current")
        .set("Authorization", "Wrong");

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it("should be able to get user", async () => {
      const response = await request(app.getHttpServer())
        .get("/api/users/current")
        .set("Authorization", "test1");

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test1");
      expect(response.body.data.name).toBe("test1");
    });
  });

  describe("PATCH /api/users/current", () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it("should be rejected if request is invalid", async () => {
      const response = await request(app.getHttpServer())
        .patch("/api/users/current")
        .set("Authorization", "test1")
        .send({
          username: "",
          password: "",
          name: ""
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it("should be able to update name", async () => {
      const response = await request(app.getHttpServer())
        .patch("/api/users/current")
        .set("Authorization", "test1")
        .send({
          name: "test1 updated"
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test1");
      expect(response.body.data.name).toBe("test1 updated");
    });

    it("should be able to update password", async () => {
      let response = await request(app.getHttpServer())
        .patch("/api/users/current")
        .set("Authorization", "test1")
        .send({
          password: "updated"
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test1");
      expect(response.body.data.name).toBe("test1");
      
      response = await request(app.getHttpServer())
        .post("/api/users/login")
        .send({
          username: "test1",
          password: "updated"
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe("DELETE /api/users/current", () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it("should be rejected if token is invalid", async () => {
      const response = await request(app.getHttpServer())
        .delete("/api/users/current")
        .set("Authorization", "Wrong");

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it("should be able to logout", async () => {
      const response = await request(app.getHttpServer())
        .delete("/api/users/current")
        .set("Authorization", "test1");

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);

      const user = await testService.getUser();
      expect(user.token).toBeNull();
    });
  });
});
