import {ApiProperty} from "@nestjs/swagger";

export class CreateWorkerDto{
    @ApiProperty()
    phone:string;
    @ApiProperty()
    password:string;
    @ApiProperty()
    firstName:string;
    @ApiProperty()
    secondName:string;
    @ApiProperty()
    middleName:string
    @ApiProperty()
    iin:string
    @ApiProperty({example:"dd-mm-yyyy"})
    date:Date
    @ApiProperty()
    cityId:number;
    @ApiProperty()
    street:string;
    @ApiProperty()
    floor:number;
    @ApiProperty()
    building:string;
    @ApiProperty()
    apartment:string
    @ApiProperty()
    index:string
}