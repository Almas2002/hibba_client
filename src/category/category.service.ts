import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, updateCategory } from './dto/create-category.dto';
import { ExceptionHandler } from '@nestjs/core/errors/exception-handler';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {
  }

  async createCategory(data: CreateCategoryDto) {
    console.log(data);
    return await this.categoryRepository.save({ ...data, gender: { id: data.genderId } });
  }

  async updateCategory(data: updateCategory) {
    const category = await this.categoryRepository.findOne({ id: data.id });
    if(!category){
      throw new HttpException("не найден категория",400)
    }
    category.value = data.value
    return await this.categoryRepository.save(category)
  }
  async deleteCategory(id:number){
    await this.categoryRepository.delete({id})
  }
  async getCategories(genderId:number){
    if(genderId){
      return await this.categoryRepository.find({where:{gender:{id:genderId}},relations:["gender"]})
    }
    return await this.categoryRepository.find()
  }
  async getOneCategory(id:number){
    return await this.categoryRepository.findOne({id})
  }
}