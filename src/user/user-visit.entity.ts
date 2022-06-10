import {User} from "./user.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserVisit{
    @PrimaryGeneratedColumn()
    id:number
    @Column({default:0})
    amount:number
    @ManyToOne(()=>User,user=>user.visit)
    user:User
    @Column({type:"date"})
    date:Date
}