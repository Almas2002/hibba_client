import { IPagination } from '../profile/interfaces/get-profile-query.interface';


export interface GetProfileQueryInterface extends IPagination{
  userId:number;
  ageTo?:number;
  ageFrom?:number;
  block?:boolean;
  category?:boolean;
  hobby?:boolean
  religion?:boolean
  search?:string
}