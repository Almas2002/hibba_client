import {Room} from "./room.entity";
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AgoraChannel {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    token: string
    @OneToOne(()=>Room,room=>room)
    @JoinColumn()
    room: Room
}