import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id:number;
  @ManyToOne(()=>User,user=>user)
  user:User
  @Column()
  text:string
}