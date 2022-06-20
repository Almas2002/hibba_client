import {Module} from "@nestjs/common";
import {HadisController} from "./hadis.controller";
import {HadisService} from "./hadis.service";
import {TypeOrmCoreModule} from "@nestjs/typeorm/dist/typeorm-core.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Hadis} from "./hadis.entity";
import {HadisCategory} from "./hadis-category.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers:[HadisController],
    providers:[HadisService],
    imports:[TypeOrmModule.forFeature([Hadis,HadisCategory]),AuthModule]
})
export class HadisModule{

}