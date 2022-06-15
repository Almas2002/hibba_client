"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var auth_milddleaware_1 = require("./middleware/auth.milddleaware");
var auth_module_1 = require("./auth/auth.module");
var user_module_1 = require("./user/user.module");
var file_module_1 = require("./file/file.module");
var serve_static_1 = require("@nestjs/serve-static");
var path = require("path");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var hobby_module_1 = require("./hobby/hobby.module");
var category_module_1 = require("./category/category.module");
var profile_module_1 = require("./profile/profile.module");
var role_module_1 = require("./role/role.module");
var religion_module_1 = require("./religion/religion.module");
var gender_module_1 = require("./gender/gender.module");
var complaint_module_1 = require("./complaint/complaint.module");
var region_module_1 = require("./region/region.module");
var notification_module_1 = require("./notification/notification.module");
var chat_module_1 = require("./chat/chat.module");
var pushNotification_module_1 = require("./pushNotification/pushNotification.module");
require('dotenv').config();
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(auth_milddleaware_1.AuthMiddleware).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL
        });
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: process.env.POSTGRES_HOST,
                    port: 5432,
                    username: process.env.POSTGRES_USER,
                    database: process.env.POSTGRES_DB,
                    password: process.env.POSTGRES_PASSWORD,
                    ssl: false,
                    // url: process.env.DATABASE_URL,
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true
                }),
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '.env'
                }),
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: path.resolve(__dirname, 'static')
                }), auth_module_1.AuthModule, user_module_1.UserModule, file_module_1.FileModule, hobby_module_1.HobbyModule, category_module_1.CategoryModule,
                profile_module_1.ProfileModule, role_module_1.RoleModule, religion_module_1.ReligionModule, gender_module_1.GenderModule, complaint_module_1.ComplaintModule, region_module_1.RegionModule, notification_module_1.NotificationModule, chat_module_1.ChatModule, pushNotification_module_1.PushNotificationModule
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
