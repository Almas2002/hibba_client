export interface GetProfileQueryInterface extends IPagination{
  userId:number;
  ageTo?:number;
  ageFrom?:number;
  block?:boolean;
  category?:number;
  hobby?:string
  religion?:number
  search?:string
  region?:number
  kids?:boolean
}
export interface IPagination {
  limit:number;
  page:number;
}