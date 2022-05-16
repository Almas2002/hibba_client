export interface GetProfileQueryInterface extends IPagination{
  userId:number;
  ageTo?:number;
  ageFrom?:number;
  block?:boolean;
  category?:boolean;
  hobby?:boolean
  religion?:number
  search?:string
  region?:number
}
export interface IPagination {
  limit:number;
  page:number;
}