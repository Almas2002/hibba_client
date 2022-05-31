import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { Profile } from '../profile/models/profile.entity';
import { ConnectionUser } from '../socket/connection-user.entity';
import { Room } from '../chat/model/room.entity';
import { JoinedRoom } from '../chat/model/joined-room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  phone: string;
  @Column({ select: false })
  password: string;
  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;
  @ManyToMany(() => Role, user => user.users)
  @JoinTable({ name: 'user_roles__roles_user' })
  roles: Role[];
  @OneToMany(() => ConnectionUser, user => user.user)
  connection: ConnectionUser[];
  @ManyToMany(() => Room, room => room.users)
  rooms: Room[];
  @OneToMany(() => JoinedRoom, room => room.user)
  joinedRooms: JoinedRoom[];
}