import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {HadisCategory} from "./hadis-category.entity";

@Entity()
export class Hadis{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title:string;
    @Column()
    arabic:string;
    @Column()
    translate:string;
    @Column({nullable:true})
    description:string;
    @ManyToOne(()=>HadisCategory,category=>category.hadises,{onDelete:"CASCADE"})
    category:HadisCategory
}