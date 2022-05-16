export interface GetProfileQueryInterface extends IPagination{
  userId:number;
  ageTo?:number;
  ageFrom?:number;
  block?:boolean;
  category?:number;
  hobby?:boolean
  religion?:number
  search?:string
  region?:number
}
export interface IPagination {
  limit:number;
  page:number;
}