import {HttpException} from "@nestjs/common";

export enum PostException{
    NOTFOUND= 'пост не найден'
}

export class PostNotFoundException extends HttpException{
    constructor() {
        super(PostException.NOTFOUND,404);
    }
}