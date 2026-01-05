import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gym } from "./gym.entity";


import { UserInfo } from "./user.entities";



@Entity({ name: 'branches' })
export class Branch extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", { name: "branch_id" })
    id: string;

    @Column({ name: "name", nullable: false })
    name: string;

    @Column({ name: "address", nullable: false })
    address: string;

    @Column({ name: "city", nullable: false })
    city: string;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column({ name: "is_active", type: "boolean", default: true })
        isActive: boolean;

    @Column({ name: "contact_number", nullable: true })
    contactNumber: string;
    
    @ManyToOne(() => Gym, gym => gym.id, { nullable: false })
    gym: Gym;

    @OneToMany(() => UserInfo, userInfo => userInfo.branch)
    users: UserInfo[];

    @Column({ name: "manager_gov_id", nullable: true })
    managerGovId: string;

    @Column({ name: "manager_full_name", nullable: true })
    managerFullName: string;
}