import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoryDto{
    @ApiProperty({example:"о семье",description:"hz che napisat"})
    title:string
}