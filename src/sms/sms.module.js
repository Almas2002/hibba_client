"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SmsModule = void 0;
var common_1 = require("@nestjs/common");
var sms_controller_1 = require("./sms.controller");
var sms_service_1 = require("./sms.service");
var typeorm_1 = require("@nestjs/typeorm");
var sms_entity_1 = require("./sms.entity");
require('dotenv').config();
var SmsModule = /** @class */ (function () {
    function SmsModule() {
    }
    SmsModule = __decorate([
        (0, common_1.Module)({
            controllers: [sms_controller_1.SmsController],
            imports: [typeorm_1.TypeOrmModule.forFeature([sms_entity_1.Sms])],
            exports: [sms_service_1.SmsService],
            providers: [sms_service_1.SmsService]
        })
    ], SmsModule);
    return SmsModule;
}());
exports.SmsModule = SmsModule;
