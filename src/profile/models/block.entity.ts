import {Profile} from "./profile.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Block{
    @PrimaryGeneratedColumn()
    id:number;
    @OneToOne(()=>Profile,profile=>profile.block)
    @JoinColumn()
    userProfile:Profile
    @ManyToOne(()=>Profile,profile=>profile.myBlocks)
    workerProfile:Profile
    @Column({nullable:true})
    text:string;
    @Column({default:false})
    block:boolean
}