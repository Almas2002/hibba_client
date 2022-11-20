import {Posts} from "../entity/posts.entity";
import {Profile} from "../../profile/models/profile.entity";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateCommentDto{
    @ApiProperty()
    @IsNotEmpty()
    postId:number;
    @ApiProperty()
    @IsNotEmpty()
    comment:string;
    @ApiProperty({required:false})
    parentCommentId:number
}
export class CreateCommentInService{
    post:Posts;
    comment:string;
    parentCommentId:number;
    profile:Profile;
}
export class QueryCommentsFilter{
    limit:number;
    postId:number;
    page:number;
    parentCommentId:number
}