export class CreateProfileDto {
  profile: ProfileData;
  images: ImageData[];
  userId:number
}

export class ProfileData {
  userId: number;
  description: string;
  region: string;
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
