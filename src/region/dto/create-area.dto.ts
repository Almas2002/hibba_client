import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateAreaDto{
    @ApiProperty()
    @IsNotEmpty()
    value:string
}