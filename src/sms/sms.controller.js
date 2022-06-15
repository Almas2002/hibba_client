"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.SmsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var SmsController = /** @class */ (function () {
    function SmsController(smsService) {
        this.smsService = smsService;
    }
    SmsController.prototype.check = function (dto) {
        return this.smsService.checkCode(dto);
    };
    SmsController.prototype.sendCode = function (dto) {
        return this.smsService.createSMSPhone(dto.phone);
    };
    __decorate([
        (0, common_1.Post)('check'),
        __param(0, (0, common_1.Body)())
    ], SmsController.prototype, "check");
    __decorate([
        (0, common_1.Post)('send-code'),
        __param(0, (0, common_1.Body)())
    ], SmsController.prototype, "sendCode");
    SmsController = __decorate([
        (0, swagger_1.ApiTags)('SMS'),
        (0, common_1.Controller)('sms')
    ], SmsController);
    return SmsController;
}());
exports.SmsController = SmsController;
