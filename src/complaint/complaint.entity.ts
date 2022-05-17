import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { BaseEntity } from '../baseEntity';
export enum ComplainStatus{
  NEW = "NEW",
  MODERATION = "MODERATION",
  COMPLETED = "COMPLETED"
}

@Entity()
export class Complaint extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>Profile,profile=>profile.complaints)
  culprit:Profile

  @ManyToOne(() => Profile, profile => profile.sendReports)
  reporter: Profile;
  @Column()
  text: string;

  @Column({enum:ComplainStatus,default:ComplainStatus.NEW})
  status:ComplainStatus
}