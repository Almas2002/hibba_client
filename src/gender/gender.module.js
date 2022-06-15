"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GenderModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var gender_entity_1 = require("./gender.entity");
var gender_controller_1 = require("./gender.controller");
var gender_service_1 = require("./gender.service");
var GenderModule = /** @class */ (function () {
    function GenderModule() {
    }
    GenderModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([gender_entity_1.Gender])],
            controllers: [gender_controller_1.GenderController],
            providers: [gender_service_1.GenderService],
            exports: [gender_service_1.GenderService]
        })
    ], GenderModule);
    return GenderModule;
}());
exports.GenderModule = GenderModule;
