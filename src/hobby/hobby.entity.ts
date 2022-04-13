import { Gender } from '../gender/gender.entity';
import { Profile } from '../profile/profile.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hobby {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  value: string;
  @ManyToOne(()=>Gender,gender=>gender)
  gender: Gender;
  @ManyToMany(()=>Profile,profile=>profile.hobbies)
  users: Profile[];
}