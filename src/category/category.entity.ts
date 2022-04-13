import { Gender } from '../gender/gender.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  value: string;
  @ManyToOne(() => Gender, gender => gender.categories)
  gender: Gender;
  @OneToMany(() => Profile, profile => profile.category)
  profiles: Profile[];
}