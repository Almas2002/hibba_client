import { User } from '../user/user.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Like} from "../profile/models/like.entity";
import {Message} from "../chat/model/message.entity";

export enum NotificationType{
  LIKE = "LIKE",
  NOTIFICATION = "NOTIFICATION",
  MESSAGE = "MESSAGE"
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id:number;
  @ManyToOne(()=>User,user=>user,{cascade:true})
  user:User
  @Column()
  text:string
  @Column({enum:NotificationType,default:NotificationType.NOTIFICATION})
  type:NotificationType

  @OneToOne(()=>Like,like =>like,{cascade:true})
  @JoinColumn()
  like?:Like

  @OneToOne(()=>Message,message=>message.notifications,{nullable:true,cascade:true})
  @JoinColumn()
  message?:Message
}