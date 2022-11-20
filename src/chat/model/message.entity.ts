import {User} from '../../user/user.entity';
import {Room} from './room.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Notification} from "../../notification/notification.entity";
import {Complaint} from "../../complaint/complaint.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    text: string;
    @ManyToOne(() => User, user => user, {onDelete: "SET NULL"})
    user: User;
    @ManyToOne(() => Room, room => room.messages)
    room: Room;
    @Column({default: false})
    read: boolean
    @CreateDateColumn({type: "timestamp"})
    createAt: Date;
    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

    @OneToOne(() => Notification, notification => notification.message)
    notifications: Notification

    @OneToOne(() => Complaint, complaint => complaint.message)
    complaint: Complaint

}