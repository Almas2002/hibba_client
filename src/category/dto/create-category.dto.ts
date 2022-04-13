import { CreateGenderDto } from '../../gender/dto/create-gender.dto';

export class CreateCategoryDto {
   value:string;
   genderId:number
}
export type updateCategory =  CreateGenderDto & {id:number}