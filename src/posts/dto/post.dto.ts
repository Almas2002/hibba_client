import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreatePostDto{
}

export class QueryPostFilter{
    limit:number;
    page:number;
    profileId:number;
}