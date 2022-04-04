import { ApiProperty } from '@nestjs/swagger';

export class AddImageDto {
   @ApiProperty({example:"87478015284",description:"номер телефона"})
   profileId:number;
}