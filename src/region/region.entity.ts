import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity()
export class Region{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  value:string
  @OneToMany(()=>Profile,profile=>profile)
  profiles:Profile[]
}