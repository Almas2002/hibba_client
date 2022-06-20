import {Body, Controller, Delete, Get, Injectable, Param, Post, UseGuards} from "@nestjs/common";
import {HadisService} from "./hadis.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {ApiOperation, ApiProperty, ApiTags} from "@nestjs/swagger";
import {CreateHadisDto} from "./dto/create-hadis.dto";
import {RoleGuards} from "../auth/guard/role.guard";
import {Role} from "../user/decorators/role.decorator";
import {RoleEnums} from "../enums/role.enums";
@ApiTags("hadis")
@Controller("hadis")
export class HadisController {
    constructor(private hadisService: HadisService) {
    }
    @Role(RoleEnums.SUPER_ADMIN,RoleEnums.WORKER)
    @UseGuards(RoleGuards)
    @ApiOperation({summary: "create category hadis (admin)"})
    @Post("category")
    create(@Body()dto: CreateCategoryDto) {
        return this.hadisService.createCategory(dto)
    }
    @Role(RoleEnums.SUPER_ADMIN,RoleEnums.WORKER)
    @UseGuards(RoleGuards)
    @ApiOperation({summary: "create  hadis (admin)"})
    @Post("/:id")
    createHadis(@Param('id')id: number, @Body()hadis: CreateHadisDto) {
        hadis.categoryId = id
        return this.hadisService.createHadis(hadis)
    }
    @ApiOperation({summary: "get  hadis category"})
    @Get("category")
    getHadisCategory(){
        return this.hadisService.getCategories()
    }
    @ApiOperation({summary: "get  hadis list with categoryId (param)"})
    @Get("list/:id")
    getList(@Param('id')id:number){
        return this.hadisService.getHadis(id)
    }
    @ApiOperation({summary: "get  hadis  with Id (param)"})
    @Get('/one/:id')
    getHadis(@Param('id')id:number){
        return this.hadisService.getFullHadis(id)
    }
    @Role(RoleEnums.SUPER_ADMIN,RoleEnums.WORKER)
    @UseGuards(RoleGuards)
    @ApiOperation({summary: "delete  hadis category with Id (param) (admin)"})
    @Delete('category/:id')
    deleteCategory(@Param('id')id:number){
        return this.hadisService.deleteHadisCategory(id)
    }
    @Role(RoleEnums.SUPER_ADMIN,RoleEnums.WORKER)
    @UseGuards(RoleGuards)
    @ApiOperation({summary: "delete  hadis with Id (param) (admin)"})
    @Delete(':id')
    deleteHadis(@Param('id')id:number){
        return this.hadisService.deleteHadis(id)
    }


}