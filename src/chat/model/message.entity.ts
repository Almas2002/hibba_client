import { User } from '../../user/user.entity';
import { Room } from './room.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}