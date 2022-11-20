import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Posts} from "./entity/posts.entity";
import {Comment} from "./entity/comment.entity";
import {PostLike} from "./entity/post-like.entity";
import {PostsController} from "./posts.controller";
import {PostsService} from "./service/posts.service";
import {CommentService} from "./service/comment.service";
import {PostLikeService} from "./service/post-like.service";
import {ProfileModule} from "../profile/profile.module";
import {FileModule} from "../file/file.module";

@Module({
    imports:[TypeOrmModule.forFeature([Posts,Comment,PostLike]),ProfileModule,FileModule],
    controllers:[PostsController],
    providers:[PostsService,CommentService,PostLikeService]
})
export class PostsModule{}