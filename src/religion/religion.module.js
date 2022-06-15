"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReligionModule = void 0;
var common_1 = require("@nestjs/common");
var religion_controller_1 = require("./religion.controller");
var religion_service_1 = require("./religion.service");
var typeorm_1 = require("@nestjs/typeorm");
var religion_entity_1 = require("./religion.entity");
var ReligionModule = /** @class */ (function () {
    function ReligionModule() {
    }
    ReligionModule = __decorate([
        (0, common_1.Module)({
            controllers: [religion_controller_1.ReligionController],
            providers: [religion_service_1.ReligionService],
            imports: [typeorm_1.TypeOrmModule.forFeature([religion_entity_1.Religion])],
            exports: [religion_service_1.ReligionService]
        })
    ], ReligionModule);
    return ReligionModule;
}());
exports.ReligionModule = ReligionModule;
