import { Profile } from '../profile/models/profile.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Religion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  value: string;
  @OneToMany(() => Profile, profile => profile)
  profiles: Profile[];
}