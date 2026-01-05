import { UUID } from "crypto";
import { 
    BaseEntity, 
    Column, 
    Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./user.entities";
import { Branch } from "./branches.entity";

@Entity({ name: 'gyms' })
export class Gym extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", { name: "gym_id" })
    id: UUID


    @Column({ name: "name", nullable: false, unique: true })
    name: string


    @ManyToOne(() => UserInfo, user => user.ownedGyms, { nullable: false })
    owner : UserInfo

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date


    @OneToMany(() => UserInfo, user => user.id)
    users: UserInfo[];

    @OneToMany(() => Branch, branch => branch.gym)
    branches: Branch[];

    @Column({ name: "assigned_end_point", nullable: true })
    assignedEndPoint: string

    @Column({ name: "NIT", nullable: false, unique: true })
    NIT: string

    @Column({ name: "contact_email", nullable: false })
    contactEmail: string

    @Column({ name: "contact_phone", nullable: false })
    contactPhone: string

    @Column({ name: "is_active", type: "boolean", default: true })
    isActive: boolean

    @Column({name : "trial_ends_at", type: "timestamp", nullable: true})
    trialEndsAt: Date | null

    @Column({name : "is_trial", type: "boolean", nullable: true})
    isTrial: boolean | null

}