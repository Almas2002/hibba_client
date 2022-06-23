import {Inject, Injectable} from "@nestjs/common";
import {Column, ManyToOne, PrimaryGeneratedColumn, Repository} from "typeorm";
import {HadisCategory} from "./hadis-category.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Hadis} from "./hadis.entity";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {CreateHadisDto} from "./dto/create-hadis.dto";

@Injectable()
export class HadisService {
    constructor(@InjectRepository(HadisCategory) private hadisCategory: Repository<HadisCategory>,
                @InjectRepository(Hadis) private hadis: Repository<Hadis>) {
    }

    async createCategory(dto: CreateCategoryDto) {
        return await this.hadisCategory.save({title: dto.title})
    }

    async createHadis(dto: CreateHadisDto) {
        return await this.hadis.save({
            ...dto,
            category: {id: dto.categoryId},
            description: dto.description != undefined ? dto.description : ""
        })
    }
    async getCategories(){
        return await this.hadisCategory.find()
    }
    async getHadis(id:number){
        const query = this.hadis.createQueryBuilder("hadis")
            .select("hadis.id","id")
            .addSelect("hadis.title","title")
            .addSelect("hadis.arabic","arabic")
            .addSelect("hadis.translate","translate")
            .addSelect("hadis.description","description")
            .leftJoin("hadis.category","category")
            .andWhere("category.id = :id",{id})
        return await query.getRawMany()
    }
    async getFullHadis(id:number){
        return await this.hadis.findOne({where:{id}})
    }
    async deleteHadisCategory(id:number){
        await this.hadisCategory.delete({id})
    }
    async deleteHadis(id:number){
        await this.hadis.delete({id})
    }
}