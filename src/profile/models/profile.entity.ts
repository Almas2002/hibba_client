import {Gender} from '../../gender/gender.entity';
import {Category} from '../../category/category.entity';
import {Hobby} from '../../hobby/hobby.entity';
import {
    Column,
    Entity, JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Complaint} from '../../complaint/complaint.entity';
import {Like} from './like.entity';
import {BaseEntity} from '../../baseEntity';
import {Religion} from '../../religion/religion.entity';
import {ProfilePhotos} from '../profile-photos.entity';
import {User} from '../../user/user.entity';
import {Region} from '../../region/region.entity';
import {Place} from "./place.entity";
import {Block} from "./block.entity";


@Entity()
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(() => User, user => user)
    @JoinColumn({name: "user_id"})
    user: User;
    @Column({default: ""})
    description!: string
    @Column({default: 0})
    age!: number
    @Column()
    firstName: string;
    @OneToOne(() => ProfilePhotos, photo => photo.profileAvatar, {onDelete: "CASCADE"})
    @JoinColumn()
    avatar: ProfilePhotos
    @Column()
    secondName: string;
    @ManyToOne(() => Category, category => category)
    category: Category;
    @ManyToOne(() => Gender, gender => gender)
    gender: Gender;
    @ManyToMany(() => Hobby, hobby => hobby.users)
    @JoinTable({name: 'profile_hobbies__hobby_profiles'})
    hobbies: Hobby[];
    @OneToOne(() => Block, block => block.userProfile)
    block: Block
    @Column({nullable: true})
    middleName: string
    // мои репорты
    @OneToMany(() => Complaint, complaint => complaint.reporter)
    sendReports: Complaint[];
    // мои жалобы
    @OneToMany(() => Complaint, complaint => complaint.culprit)
    complaints: Complaint[];

    @OneToMany(() => Like, like => like.likedProfile)
    likedUsers: Like[];

    @OneToMany(() => Like, like => like.userProfile)
    myLikes: Like[];


    @Column({default: 0})
    kids: number

    @ManyToOne(() => Religion, religion => religion)
    religion: Religion;

    @OneToMany(() => ProfilePhotos, photo => photo.profile)
    photos: ProfilePhotos[]

    @ManyToOne(() => Region, region => region.profiles)
    region: Region

    @OneToOne(() => Place, place => place.profile)
    place: Place

    @Column({type: "timestamp", nullable: true})
    date: Date

    @Column({nullable: true})
    iin: string

    @OneToOne(() => Block, block => block.workerProfile)
    myBlocks: Block[]

}