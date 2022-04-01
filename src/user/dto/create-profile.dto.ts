export class CreateProfileDto {
  userId: number;
  description: string;
  region: string;
  age: number;
  firstName: string;
  secondName: string;
  genderId: number;
  hobby?: number[];
  categoryId:number
}