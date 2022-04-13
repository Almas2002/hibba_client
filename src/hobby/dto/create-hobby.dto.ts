export class CreateHobbyDto {
  genderId:number;
  value:string
}
export type updateHobby = Omit<CreateHobbyDto, 'genderId'> & {id:number}