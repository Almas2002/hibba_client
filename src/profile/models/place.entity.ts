import {Region} from "../../region/region.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile} from "./profile.entity";

@Entity()
export class Place{
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>Region,region=>region)
    city:Region
    @Column()
    street:string;
    @Column()
    floor:number;
    @Column()
    building:string;
    @Column()
    apartment:string
    @Column()
    index:string
    @OneToOne(()=>Profile,profile=>profile)
    @JoinColumn()
    profile:Profile
}