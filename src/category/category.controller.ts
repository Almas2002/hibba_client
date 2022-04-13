import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, updateCategory } from './dto/create-category.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {
  }
  @ApiOperation({summary:"создать категорию"})
  @ApiResponse({status:201})
  @Post('create-category')
  createCategory(@Body()data:CreateCategoryDto) {
      return this.categoryService.createCategory(data)
  }
  @ApiOperation({summary:"изменить категорию"})
  @ApiResponse({status:200})
  @Put('update-category')
  updateCategory(@Body()data:updateCategory) {
      return this.categoryService.updateCategory(data)
  }
  @ApiOperation({summary:"удалить категорию"})
  @ApiResponse({status:201})
  @Delete('remove-category/:id')
  removeCategory(@Param('id')id:number) {
      return this.categoryService.deleteCategory(id)
  }
  @ApiOperation({summary:"взять категорий"})
  @ApiQuery({example:"1",description:"взять категорий по гендер айди",required:false})
  @ApiResponse({status:201})
  @Get('get-categories')
  getCategories(@Query('id')id:number) {
      return this.categoryService.getCategories(id)
  }
  @ApiOperation({summary:"взять одну категорию"})
  @ApiResponse({status:201})
  @Get('get-one-category/:id')
  getOneCategory(@Param('id')id:number) {
     return this.categoryService.getOneCategory(id)
  }

}