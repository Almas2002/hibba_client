import { ApiProperty } from '@nestjs/swagger';

export class CreateHobbyDto {
  @ApiProperty({example:"1",description:"id of gender"})
  genderId:number;
  @ApiProperty({example:"Сопрт",description:"значение"})
  value:string
}
export type updateHobby = Omit<CreateHobbyDto, 'genderId'> & {id:number}