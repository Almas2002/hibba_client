import {ApiProperty} from "@nestjs/swagger";

export class UpdateWorkerDto{
    @ApiProperty({example:"Almas"})
    firstName:string;
    @ApiProperty({example:"Zhomartuly"})
    middleName:string
    @ApiProperty({example:"Zhumakhanov"})
    secondName:string;
    @ApiProperty({example:1})
    cityId:number;
    @ApiProperty({example:"Zhanatalap"})
    street:string;
    @ApiProperty({example:"32a"})
    apartment:string
    @ApiProperty({example:"Жк алатау"})
    building:string
    @ApiProperty({example:5})
    floor:number
    @ApiProperty({example:"000001"})
    index:string

}