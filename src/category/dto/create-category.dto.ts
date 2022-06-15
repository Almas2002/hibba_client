import { CreateGenderDto } from '../../gender/dto/create-gender.dto';
import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoryDto {
   @ApiProperty({example:"одинок"})
   value:string;
   @ApiProperty({example:"1"})
   genderId:number
}
export type updateCategory =  CreateGenderDto & {id:number}