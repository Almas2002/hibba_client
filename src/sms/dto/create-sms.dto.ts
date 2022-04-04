import { ApiProperty } from '@nestjs/swagger';

export class CreateSmsDto {
  @ApiProperty({example:"87478015284",description:"телефон номер"})
  phone:string
}