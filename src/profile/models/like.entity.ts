import { Profile } from './profile.entity';
import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { BaseEntity } from '../../baseEntity';
import {Notification} from "../../notification/notification.entity";

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false })
  mutually: boolean;
  @ManyToOne(() => Profile, profile => profile.myLikes)
  profile: Profile;
  @ManyToOne(() => Profile, profile => profile.likedUsers)
  likedProfile: Profile;

  @OneToOne(()=>Notification,notification=>notification.like)
  notification:Notification
}