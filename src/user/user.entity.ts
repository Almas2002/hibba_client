import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { Profile } from '../profile/profile.entity';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id:number;
  @Column({unique:true})
  phone:string;
  @Column({select:false})
  password:string;
  @OneToOne(()=>Profile,profile=>profile.user)
  profile:Profile
  @ManyToMany(()=>Role,user=>user.users)
  @JoinTable({name:"user_roles__roles_user"})
  roles:Role[]
}