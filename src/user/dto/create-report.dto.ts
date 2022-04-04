import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({example:"1",description:"id профиля"})
  profileId: number;
  @ApiProperty({example:"some text",description:"текст жалобы"})
  text: string;
  userId: number;
}