import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Roles } from "./roles.entities";
import { Membership } from "./membership.entity";
import { PublicUserInfo } from "../controller/user/user.types";
import { Gym } from "./gym.entity";
import { Branch } from "./branches.entity";

@Entity({ name: 'users' })
export class UserInfo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", {name : "user_id"})
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  email: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "password" })
  password: string;

  @ManyToOne(() => Roles, role => role.users, { nullable: false })
  @JoinColumn({ name: "role_id" })
  role: Roles;

  @OneToMany(() => Gym, gym => gym.owner)
  ownedGyms: Gym[];

  @OneToMany(() => Gym, gym => gym.users)
  gyms: Gym[];

  @ManyToOne(() => Branch, branch => branch.users, { nullable: true })
  @JoinColumn({ name: "branch_id" })
  branch: Branch;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @OneToMany(()=>Membership, membership=>membership.user)
  membership : Membership[]

  @Column({ name: "gov_id", unique: true })
  govId: string;


  toPublicInfo() : PublicUserInfo {
    return {
      fullName: this.fullName,
      email: this.email,
      role: this.role.roleName,
      createdAt: this.createdAt,
      govId: this.govId
    };
  }
}
