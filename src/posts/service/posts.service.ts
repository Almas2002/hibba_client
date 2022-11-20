import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Posts} from "../entity/posts.entity";
import {Repository} from "typeorm";
import {CreateCommentDto, QueryCommentsFilter} from "../dto/comment.dto";
import {ProfileService} from "../../profile/profile.service";
import {FileService} from "../../file/file.service";
import {CreatePostDto, QueryPostFilter} from "../dto/post.dto";
import {CommentService} from "./comment.service";
import {CreateLikeDto} from "../dto/like.dto";
import {PostNotFoundException} from "../exceptions/post.exception";
import {PostLikeService} from "./post-like.service";

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Posts) private postRepository: Repository<Posts>,
                private profileService: ProfileService,
                private fileService: FileService, private commentService: CommentService,
                private likeService: PostLikeService) {
    }

    async create(dto: CreatePostDto, userId: number, files: any[]): Promise<{ id: number }> {
        const profile = await this.profileService.getProfileByUserId(userId)
        const post = await this.postRepository.save({profile})

        if (files?.length) {
            for (let i = 0; i < files.length; i++) {
                await this.profileService.createImagePost(post, await this.fileService.createFile(files[i]))
            }
        }
        return {id: post.id}
    }

    async createComment(dto: CreateCommentDto, userId: number): Promise<{ id: number }> {
        const profile = await this.profileService.getProfileByUserId(userId)
        const post = await this.postRepository.findOne({where: {id: dto.postId}})
        if (!post) {
            throw new PostNotFoundException()
        }
        const comment = await this.commentService.createComment({post, profile, ...dto})
        return {id: comment.id}
    }

    async getList(dto: QueryPostFilter, userId: number) {
        console.log(dto)
        const limit = dto?.limit || 10
        const page = dto?.page || 1
        const offset = page * limit - limit
        let profile = {
            id: 0,
        };
        if (userId) {
            profile = await this.profileService.getProfileByUserId(userId);
        }
        const query = this.postRepository.createQueryBuilder("post")
            .leftJoinAndSelect("post.profile", "profile").addSelect("profile.id","id")
            //.leftJoin("post.likes", "likes")
            .leftJoinAndSelect("post.photos","photo")
            .leftJoin("post.comments", "comments")
            .loadRelationCountAndMap("post.likesCount", "post.likes")
            .loadRelationCountAndMap("post.commentsCount", "post.comments")
            .loadRelationCountAndMap("post.photosCount", "post.photos")
            .leftJoinAndSelect('post.likes', 'likes', `likes.profileId = ${profile.id}`)
            //.loadRelationCountAndMap("post.profileLikeCount", "post.likes",)
            .leftJoin("post.photos", "photos")
            .groupBy("post.id")
            .addGroupBy("profile.createdAt")
            .addGroupBy("profile.updateAt")
            .addGroupBy("profile.id")
             .addGroupBy("photo.id")
            .addGroupBy("likes.id")

        if (dto?.profileId) {
            query.andWhere("post.profileId = :profileId", {profileId: dto.profileId})
        }
        query.limit(limit)
        query.offset(offset)
        const data = await query.getManyAndCount()
        return {data: data[0], count: data[1]}

    }

    async createLike(dto: CreateLikeDto,userId:number) {
        const post = await this.postRepository.findOne({where: {id: dto.postId}})
        if (!post) {
            throw new PostNotFoundException()
        }
        const profile = await this.profileService.getProfileByUserId(userId)
        return this.likeService.create(post, profile)
    }
}