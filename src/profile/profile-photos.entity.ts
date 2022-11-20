import { Profile } from './models/profile.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {Posts} from "../posts/entity/posts.entity";

@Entity()
export class ProfilePhotos {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image: string;
  @ManyToOne(() => Profile, profile => profile.photos,{onDelete:"CASCADE"})
  profile: Profile;
  @OneToOne(() => Profile, profile => profile.avatar,{onDelete:"CASCADE"})
  profileAvatar: Profile;
  @ManyToOne(() => Posts, Posts => Posts.photos,{onDelete:"CASCADE"})
  post: Posts;
}