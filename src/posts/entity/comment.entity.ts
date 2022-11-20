import {Profile} from "../../profile/models/profile.entity";
import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Posts} from "./posts.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Profile, profile => profile, {onDelete: "CASCADE"})
    profile: Profile;
    @Column()
    comment: string;
    @ManyToOne(() => Comment, comment => comment.subComments, {onDelete: "CASCADE"})
    parentComment: Comment;

    @OneToMany(() => Comment, comment => comment.parentComment)
    subComments: Comment[]

    @ManyToOne(()=>Posts,post=>post,{onDelete:"CASCADE"})
    post:Posts

    @CreateDateColumn()
    createdAt:Date
}