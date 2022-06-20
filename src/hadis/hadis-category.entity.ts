import {Hadis} from "./hadis.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class HadisCategory{
    @PrimaryGeneratedColumn()
    id:number
    @Column({unique:true})
    title:string
    @OneToMany(()=>Hadis,hadis=>hadis.category,{onDelete:"CASCADE"})
    hadises: Hadis []
}