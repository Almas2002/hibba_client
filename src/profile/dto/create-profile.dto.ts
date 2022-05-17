import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({example:"я хороший програмист",description:"описание профиля"})
  description: string;
  @ApiProperty({example:"1",description:"id"})
  regionId:number;
  @ApiProperty({example:"19",description:"сколько лет"})
  age: number;
  @ApiProperty({example:"Алмас",description:"имя"})
  firstName: string;
  @ApiProperty({example:"Жумаханов",description:"фамилья"})
  secondName: string;
  @ApiProperty({example:"1",description:"айди"})
  genderId: number;
  @ApiProperty({example:"[1,2,3]",description:""})
  hobby?: number[];
  @ApiProperty({example:"1",description:"категория"})
  categoryId: number;
  @ApiProperty({example:"1",description:"религия"})
  religionId: number;
  @ApiProperty({example:"1",description:"малыши"})
  kids: number;
  userId:number
}

export class ProfileData {
  userId: number;
  description: string;
  regionId: number;
  age: number;
  firstName: string;
  secondName: string;
  genderId: number;
  hobby?: number[];
  categoryId: number;
  religionId: number;
}

export class ImageData {
  name: string;
}
