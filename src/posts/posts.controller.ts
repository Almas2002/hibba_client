import {Body, Controller, Get, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors} from "@nestjs/common";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PostsService} from "./service/posts.service";
import {PostLikeService} from "./service/post-like.service";
import {CommentService} from "./service/comment.service";
import {CreatePostDto, QueryPostFilter} from "./dto/post.dto";
import {UserDecorator} from "../user/decorators/user.decorator";
import {AuthGuard} from "../auth/guard/auth.guard";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateCommentDto, QueryCommentsFilter} from "./dto/comment.dto";
import {CreateLikeDto} from "./dto/like.dto";
import {PostException} from "./exceptions/post.exception";
import {ApiImplicitFile} from "@nestjs/swagger/dist/decorators/api-implicit-file.decorator";

@ApiTags('посты')
@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService, private commentService: CommentService) {
    }

    @ApiCreatedResponse({
        schema: {
            oneOf: [
                {
                    properties: {
                        id: {
                            type: 'number',
                            example: 1,
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 401, schema: {
            oneOf: [
                {
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Вы не зарегестрированы',
                        },
                        status: {
                            type: 'number',
                            example: 401,
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 401, schema: {
            oneOf: [
                {
                    properties: {
                        message: {
                            type: 'string',
                            example: 'фотография не может быть пустым',
                        },
                        status: {
                            type: 'number',
                            example: 422,
                        }
                    }
                }
            ]
        }
    })
    @ApiBearerAuth('defaultBearerAuth')
    @ApiImplicitFile({ name: 'file', description: 'фото для постов' })
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor(([{name: 'file', maxCount: 10}])))
    @Post()
    createPost(@Body()dto: CreatePostDto, @UserDecorator('id')id: number, @UploadedFiles()files: { file: any[] }) {
        return this.postService.create(dto, id, files?.file)
    }

    @ApiQuery({name: 'limit', example: 10, required: false})
    @ApiQuery({name: 'page', example: 10, required: false})
    @ApiQuery({name: 'profileId', example: 10, required: false})
    @Get()
    getPostList(@Query()query: QueryPostFilter, @Req()req) {
        return this.postService.getList(query, req.user?.id)
    }
    @ApiBearerAuth('defaultBearerAuth')
    @ApiCreatedResponse({
        schema: {
            oneOf: [
                {
                    properties: {
                        id: {
                            type: 'number',
                            example: 1,
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 401, schema: {
            oneOf: [
                {
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Вы не зарегестрированы',
                        },
                        status: {
                            type: 'number',
                            example: 401,
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 404, schema: {
            oneOf: [
                {
                    properties: {
                        message: {
                            type: 'string',
                            example: PostException.NOTFOUND,
                        },
                        status: {
                            type: 'number',
                            example: 404,
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 422, schema: {
            oneOf: [
                {
                    properties: {
                        postId: {
                            type: 'array',
                            example: [
                                "postId should not be empty"
                            ],
                        },
                        comment: {
                            type: 'array',
                            example: [
                                "comment should not be empty"
                            ],
                        }
                    }
                }
            ]
        }
    })
    @UseGuards(AuthGuard)
    @Post("comments")
    createComment(@Body()dto: CreateCommentDto, @UserDecorator('id')id: number,) {
        return this.postService.createComment(dto, id)
    }

    @ApiQuery({name: 'limit', example: 10, required: false})
    @ApiQuery({name: 'page', example: 10, required: false})
    @ApiQuery({name: 'postId', example: 10, required: false})
    @ApiQuery({name: 'parentCommentId', example: 10, required: false})
    @Get("comments")
    commentsList(@Query()query: QueryCommentsFilter) {
        return this.commentService.listComments(query)
    }
    @ApiBearerAuth('defaultBearerAuth')
    @ApiResponse({
        status: 401, schema: {
            oneOf: [
                {
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Вы не зарегестрированы',
                        },
                        status: {
                            type: 'number',
                            example: 401,
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 404, schema: {
            oneOf: [
                {
                    properties: {
                        message: {
                            type: 'string',
                            example: PostException.NOTFOUND,
                        },
                        status: {
                            type: 'number',
                            example: 404,
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 422, schema: {
            oneOf: [
                {
                    properties: {
                        postId: {
                            type: 'array',
                            example: [
                                "postId should not be empty"
                            ],
                        }
                    }
                }
            ]
        }
    })
    @UseGuards(AuthGuard)
    @Post("likes")
    createLike(@Body()dto: CreateLikeDto,@UserDecorator('id')id:number) {
        return this.postService.createLike(dto,id)
    }
}