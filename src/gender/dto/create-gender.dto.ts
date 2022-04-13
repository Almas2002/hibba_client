import { ApiProperty } from '@nestjs/swagger';

export class CreateGenderDto {
  @ApiProperty({example:"Мужчина",description:"название гендера"})
  value:string
}
