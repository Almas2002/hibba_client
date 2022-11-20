import {HttpException} from "@nestjs/common";
export enum CommentException{
    NOTFOUND = "такой коментарии не найдена",
    EXIST = "такой коментарии не найдена"
}
export class CommentNotFoundException extends HttpException{
    constructor() {
        super(CommentException.NOTFOUND,404);
    }
}

export class CommentExistException extends HttpException{
    constructor() {
        super(CommentException.EXIST,400);
    }
}