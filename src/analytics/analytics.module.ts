import {Module} from "@nestjs/common";
import {AnalyticsService} from "./analytics.service";
import {AnalyticsController} from "./analytics.controller";

@Module({
    imports:[],
    providers:[AnalyticsService],
    controllers:[AnalyticsController]
})
export class AnalyticsModule{

}