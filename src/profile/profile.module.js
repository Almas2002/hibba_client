"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileModule = void 0;
var common_1 = require("@nestjs/common");
var profile_controller_1 = require("./profile.controller");
var profile_service_1 = require("./profile.service");
var typeorm_1 = require("@nestjs/typeorm");
var profile_entity_1 = require("./models/profile.entity");
var hobby_module_1 = require("../hobby/hobby.module");
var like_entity_1 = require("./models/like.entity");
var profile_photos_entity_1 = require("./profile-photos.entity");
var file_module_1 = require("../file/file.module");
var category_module_1 = require("../category/category.module");
var region_module_1 = require("../region/region.module");
var religion_module_1 = require("../religion/religion.module");
var gender_module_1 = require("../gender/gender.module");
var notification_module_1 = require("../notification/notification.module");
var auth_module_1 = require("../auth/auth.module");
var place_entity_1 = require("./models/place.entity");
var block_entity_1 = require("./models/block.entity");
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([profile_entity_1.Profile, like_entity_1.Like, profile_photos_entity_1.ProfilePhotos, place_entity_1.Place, block_entity_1.Block]), hobby_module_1.HobbyModule,
                file_module_1.FileModule, category_module_1.CategoryModule, region_module_1.RegionModule, religion_module_1.ReligionModule, gender_module_1.GenderModule, (0, common_1.forwardRef)(function () { return notification_module_1.NotificationModule; }), auth_module_1.AuthModule],
            providers: [profile_service_1.ProfileService],
            controllers: [profile_controller_1.ProfileController],
            exports: [profile_service_1.ProfileService]
        })
    ], ProfileModule);
    return ProfileModule;
}());
exports.ProfileModule = ProfileModule;
