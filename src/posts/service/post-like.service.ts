import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateCommentDto} from "../dto/comment.dto";
import {PostLike} from "../entity/post-like.entity";
import {Posts} from "../entity/posts.entity";
import {Profile} from "../../profile/models/profile.entity";

@Injectable()
export class PostLikeService {
    constructor(@InjectRepository(PostLike) private postLike: Repository<PostLike>) {
    }

    async create(post: Posts, profile: Profile) {
        let like = await this.postLike.findOne({where: {post, profile}})
        if (!like) {
            await this.postLike.save({post, profile})
            return
        }
        await this.postLike.delete({id: like.id})
    }
}