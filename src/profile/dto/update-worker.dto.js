"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateWorkerDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var UpdateWorkerDto = /** @class */ (function () {
    function UpdateWorkerDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "Almas" })
    ], UpdateWorkerDto.prototype, "firstName");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "Zhomartuly" })
    ], UpdateWorkerDto.prototype, "middleName");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "Zhumakhanov" })
    ], UpdateWorkerDto.prototype, "secondName");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 1 })
    ], UpdateWorkerDto.prototype, "cityId");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "Zhanatalap" })
    ], UpdateWorkerDto.prototype, "street");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "32a" })
    ], UpdateWorkerDto.prototype, "apartment");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "Жк алатау" })
    ], UpdateWorkerDto.prototype, "building");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 5 })
    ], UpdateWorkerDto.prototype, "floor");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "000001" })
    ], UpdateWorkerDto.prototype, "index");
    return UpdateWorkerDto;
}());
exports.UpdateWorkerDto = UpdateWorkerDto;
