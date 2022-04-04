import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  userId: number;
  @ApiProperty({ example: 'я отличный парень', description: 'описание профиля' })
  description: string;
  @ApiProperty({ example: 'Алматы', description: 'город' })
  region: string;
  @ApiProperty({ example: '19', description: 'возраст пользователя' })
  age: number;
  @ApiProperty({ example: 'Алмас', description: 'имя пользователя' })
  firstName: string;
  @ApiProperty({ example: 'Жумаханов', description: 'фамилья пользователя' })
  secondName: string;
  @ApiProperty({ example: '1', description: 'id гендера' })
  genderId: number;
  @ApiProperty({ example: '[1,2,3,4]', description: 'id гендера' })
  hobby?: number[];
  @ApiProperty({ example: '1', description: 'id категорий' })
  categoryId: number;
}