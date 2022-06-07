import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Profile} from '../profile/models/profile.entity';
import {BaseEntity} from '../baseEntity';
import {Message} from "../chat/model/message.entity";

export enum ComplainStatus {
    NEW = "NEW",
    MODERATION = "MODERATION",
    COMPLETED = "COMPLETED"
}

@Entity()
export class Complaint extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Profile, profile => profile.complaints)
    culprit: Profile

    @ManyToOne(() => Profile, profile => profile.sendReports)
    reporter: Profile;
    @Column()
    text: string;

    @Column({enum: ComplainStatus, default: ComplainStatus.NEW})
    status: ComplainStatus

    @OneToOne(() => Message, message => message)
    @JoinColumn()
    message: Message
}