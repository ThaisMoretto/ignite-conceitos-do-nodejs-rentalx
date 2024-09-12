import request from "supertest";
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import { app } from "@shared/infra/http/app";
import dataSource from '@shared/infra/typeorm/index';

describe("Create Category Controller", () => {
  beforeAll(async () => {
    const id = uuidV4();
    const password = await hash('admin', 8);

    await dataSource.initialize().then(async () => {
      await dataSource.dropDatabase();
      await dataSource.runMigrations();
      await dataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.query(
          `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `,
        );
      });
    }).catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest description",
    }).set({
      Authorization: `Bear ${token}`
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with name already exist", async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest description",
    }).set({
      Authorization: `Bear ${token}`
    });

    expect(response.status).toBe(400);
  });
});
