import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateLikeDto{
    @ApiProperty({description:"id поста",example:1})
    @IsNotEmpty()
    postId:number
}