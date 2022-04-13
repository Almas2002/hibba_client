import { Profile } from './profile.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}