"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateReportDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var CreateReportDto = /** @class */ (function () {
    function CreateReportDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "1", description: "id профиля" })
    ], CreateReportDto.prototype, "profileId");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "some text", description: "текст жалобы" })
    ], CreateReportDto.prototype, "text");
    return CreateReportDto;
}());
exports.CreateReportDto = CreateReportDto;
