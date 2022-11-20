import {Profile} from "../../profile/models/profile.entity";
import {Posts} from "./posts.entity";
import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class PostLike{
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>Profile,profile=>profile.postLikes,{onDelete:"CASCADE"})
    profile:Profile;
    @ManyToOne(()=>Posts,post=>post.likes)
    post:Posts
}