import { ProfileData } from './create-profile.dto';

export type UpdateProfileDto = Omit<ProfileData, 'hobby' | 'userId'> & {profileId:number}