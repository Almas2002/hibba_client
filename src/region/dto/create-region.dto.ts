import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateRegionDto {
  @ApiProperty()
  @IsNotEmpty()
  value:string
  @ApiProperty()
  @IsNotEmpty()
  areaId:number
}