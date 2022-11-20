import { CreateGenderDto } from '../../gender/dto/create-gender.dto';
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateCategoryDto {
   @IsNotEmpty()
   @ApiProperty({example:"одинок" ,description:"название категорий"})
   value:string;
   @ApiProperty({example:"1",description:"id of gender"})
   @IsNotEmpty()
   genderId:number
}
export type updateCategory =  CreateGenderDto & {id:number}