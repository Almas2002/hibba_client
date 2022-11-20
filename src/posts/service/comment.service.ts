import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "../entity/comment.entity";
import {Repository} from "typeorm";
import {CreateCommentInService, QueryCommentsFilter} from "../dto/comment.dto";
import {CommentNotFoundException} from "../exceptions/comment.exception";


@Injectable()
export class CommentService {
    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {
    }


    async createComment(dto: CreateCommentInService) {
        let parentComment = null;
        if (dto.parentCommentId) {
            parentComment = await this.findCommentById(dto.parentCommentId)
        }
        const comment = await this.commentRepository.save({parentComment, ...dto})
        return {id: comment.id}
    }

    async findCommentById(id: number) {
        const comment = await this.commentRepository.findOne({where: {id}})
        if (!comment) {
            throw new CommentNotFoundException()
        }
        return comment
    }

    async listComments(dto: QueryCommentsFilter) {
        const limit = dto?.limit || 10
        const page = dto?.page || 1
        const offset = page * limit - limit
        const query = this.commentRepository.createQueryBuilder("comment")
            .select("comment.id","id")
            .addSelect("comment.comment","comment")
            .leftJoin("comment.profile", "profile")
            .leftJoin("profile.avatar", "avatar")
            .addSelect('profile.id', 'profileId')
            .addSelect('avatar.image', 'profile_avatar')
            .addSelect('profile.firstName', 'name')
            .addSelect('COUNT(subComments.id)', 'subCount')
            .leftJoin('comment.subComments', 'subComments')
            .addSelect('comment.createdAt',"createdAt")
            .orderBy("comment.id", "DESC")
            .groupBy("comment.id")
            .addGroupBy("profile.id")
            .addGroupBy("avatar.image")

        if (dto?.postId) {
            query.andWhere("comment.postId = :postId", {postId: dto.postId})
        }
        if (dto?.parentCommentId) {
            query.andWhere("comment.parentCommentId = :parentCommentId", {parentCommentId: dto.parentCommentId})
        }else {
            query.andWhere("comment.parentCommentId Is NUll")
        }

        query.limit(limit)
        query.offset(offset)

        const data = await query.getRawMany()
        const count = await query.getCount()

        return {data,count}
    }


}