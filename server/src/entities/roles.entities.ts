import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./user.entities";

@Entity({ name: "roles" })
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "role_id" })
  roleId: string;

  @Column({ name: "role_name" })
  roleName: string;

  @OneToMany(() => UserInfo, user => user.role)
  users: UserInfo[];
}
