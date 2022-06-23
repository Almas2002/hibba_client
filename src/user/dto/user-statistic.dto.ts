import {ApiProperty} from "@nestjs/swagger";

export class UserStatisticDto{
    @ApiProperty()
    dateFrom:Date
    @ApiProperty()
    dateTo:Date
    @ApiProperty()
    userId?:number
}