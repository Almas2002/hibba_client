"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateWorkerDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var CreateWorkerDto = /** @class */ (function () {
    function CreateWorkerDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "phone");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "password");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "firstName");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "secondName");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "middleName");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "iin");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "dd-mm-yyyy" })
    ], CreateWorkerDto.prototype, "date");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "cityId");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "street");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "floor");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "building");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "apartment");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], CreateWorkerDto.prototype, "index");
    return CreateWorkerDto;
}());
exports.CreateWorkerDto = CreateWorkerDto;
