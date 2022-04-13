import { Profile } from './profile.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../baseEntity';

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
}