import { ApiProperty } from '@nestjs/swagger';

export class UpdateAvatarDto {
  @ApiProperty({example:"1",description:"id of profile"})
  photoId:number
}