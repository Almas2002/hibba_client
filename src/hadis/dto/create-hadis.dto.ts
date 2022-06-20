import {ApiProperty} from "@nestjs/swagger";

export class CreateHadisDto{
    categoryId:number;
    @ApiProperty({example:"hz",description:"hz"})
    title:string;
    @ApiProperty({example:"hz",description:"hz"})
    arabic:string;
    @ApiProperty({example:"hz",description:"hz"})
    translate:string;
    @ApiProperty({example:"hz",description:"hz"})
    description:string
}