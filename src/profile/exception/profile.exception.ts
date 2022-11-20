import {HttpException} from "@nestjs/common";

export enum ProfileException {
    NOTFOUND = "профиль не найден"
}

export class ProfileNotFoundException extends HttpException{
    constructor() {
        super(ProfileException.NOTFOUND,404);
    }
}