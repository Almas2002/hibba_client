import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { BaseEntity } from '../baseEntity';

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
}