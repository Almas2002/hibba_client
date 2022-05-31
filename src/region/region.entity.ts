import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Profile} from '../profile/models/profile.entity';
import {Place} from "../profile/models/place.entity";

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    value: string
    @OneToMany(() => Profile, profile => profile)
    profiles: Profile[]

    @OneToMany(() => Place, place => place.city)
    places: Place[]
}