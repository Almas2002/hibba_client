import { IPagination } from './IPagination';

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