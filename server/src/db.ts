import { DataSource } from "typeorm";
import { UserInfo } from "./entities/user.entities";
import { Roles } from "./entities/roles.entities";
import { Membership } from "./entities/membership.entity";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1", 
  port: 5432,
  username: "soto",
  password: "password",
  database: "root",
  synchronize: true,
  logging: true,
  entities: [UserInfo, Roles, Membership],
  migrations: [],
  subscribers: [],
});
