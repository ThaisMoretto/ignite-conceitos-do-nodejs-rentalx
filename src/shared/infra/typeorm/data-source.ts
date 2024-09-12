import "reflect-metadata";

import { DataSource } from "typeorm";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

export default (host = "database"): DataSource => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    port: 5432,
    username: "docker",
    password: "123456",
    database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
    entities: [Category, Specification, User, Car, CarImage, Rental],
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  });

  return dataSource;
};
