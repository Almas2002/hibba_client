import { ApiProperty } from '@nestjs/swagger';

export class LikeProfileDto {
  userId:number;
  @ApiProperty({example:"1",description:"profile id"})
  profileId:number
}