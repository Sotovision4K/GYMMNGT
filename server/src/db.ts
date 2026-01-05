import { DataSource } from "typeorm";
import { UserInfo } from "./entities/user.entities";
import { Roles } from "./entities/roles.entities";
import { Membership } from "./entities/membership.entity";
import { Gym } from "./entities/gym.entity";
import { Branch } from "./entities/branches.entity";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1", 
  port: 5432,
  username: "soto",
  password: "password",
  database: "root",
  synchronize: true,
  logging: true,
  entities: [UserInfo, Roles, Membership, Gym, Branch],
  migrations: [],
  subscribers: [],
});
