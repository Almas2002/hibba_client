import { ApiProperty } from '@nestjs/swagger';

export class CreateComplaintDto {
  userId:number
  @ApiProperty({example:"1",description:"айди профиля который вы хотите кинуть жалобу"})
  profileId:number
  @ApiProperty({example:"он кинул мне фотку члена",description:"описание жалобы"})
  text:string
  @ApiProperty({example:"идентификатор сообщение",description:"доказательсво на жалобу"})
  messageId:number
}