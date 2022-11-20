import {ProfilePhotos} from "../../profile/profile-photos.entity";
import {Profile} from "../../profile/models/profile.entity";
import {Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PostLike} from "./post-like.entity";
import {Comment} from "./comment.entity";

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToMany(() => ProfilePhotos, photo => photo.post)
    photos: ProfilePhotos[];
    @ManyToOne(() => Profile, profile => profile.posts, {onDelete: "CASCADE"})
    profile: Profile;
    @OneToMany(() => PostLike, like => like.post)
    likes: PostLike [];
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment
}