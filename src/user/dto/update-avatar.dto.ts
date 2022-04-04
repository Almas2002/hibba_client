import { ApiProperty } from '@nestjs/swagger';

export class UpdateAvatarDto {
  @ApiProperty({ description: 'айди фотографий', example: '1' })
  imageId: number;
}