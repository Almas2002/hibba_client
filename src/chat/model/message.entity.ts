import { User } from '../../user/user.entity';
import { Room } from './room.entity';
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

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @ManyToOne(() => User, user => user)
  user: User;
  @ManyToOne(() => Room, room => room.messages)
  room: Room;
  @Column()
  read:boolean
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(()=>Notification,notification=>notification.message)
  notifications:Notification
}