import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Profile} from '../profile/models/profile.entity';
import {Place} from "../profile/models/place.entity";
import {Area} from "./area.entity";

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    value: string
    @OneToMany(() => Profile, profile => profile.region,{onDelete:"SET NULL"})
    profiles: Profile[]

    @OneToMany(() => Place, place => place.city,{onDelete:"SET NULL"})
    places: Place[]

    @ManyToOne(()=>Area,area=>area.regions)
    area:Area
}