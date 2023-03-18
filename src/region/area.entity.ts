import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Region} from "./region.entity";

@Entity()
export class Area {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    value: string;
    @OneToMany(() => Region, region => region.area)
    regions: Region[]
}