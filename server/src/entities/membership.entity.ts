import { UUID } from "crypto";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./user.entities";

@Entity({ name: 'memberships' })
export class Membership extends BaseEntity {
@PrimaryGeneratedColumn("uuid", {name : "membership_id"})
    id : UUID

    @Column({name : "membership_type"})
    membershipType : string

    @Column({name : "start_date"})
    startDate : Date

    @Column({name : "end_date"})
    endDate : Date

    @ManyToOne(()=> UserInfo, user=>user.membership)
    @JoinColumn()
    user : UserInfo

}