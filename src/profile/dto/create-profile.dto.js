"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImageData = exports.ProfileData = exports.CreateProfileDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var CreateProfileDto = /** @class */ (function () {
    function CreateProfileDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "я хороший програмист", description: "описание профиля" })
    ], CreateProfileDto.prototype, "description");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "1", description: "id" })
    ], CreateProfileDto.prototype, "regionId");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "19", description: "сколько лет" })
    ], CreateProfileDto.prototype, "age");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "Алмас", description: "имя" })
    ], CreateProfileDto.prototype, "firstName");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "Жумаханов", description: "фамилья" })
    ], CreateProfileDto.prototype, "secondName");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "1", description: "айди" })
    ], CreateProfileDto.prototype, "genderId");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "1,2,3", description: "" })
    ], CreateProfileDto.prototype, "hobby");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "1", description: "категория" })
    ], CreateProfileDto.prototype, "categoryId");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "1", description: "религия" })
    ], CreateProfileDto.prototype, "religionId");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: "1", description: "малыши" })
    ], CreateProfileDto.prototype, "kids");
    return CreateProfileDto;
}());
exports.CreateProfileDto = CreateProfileDto;
var ProfileData = /** @class */ (function () {
    function ProfileData() {
    }
    return ProfileData;
}());
exports.ProfileData = ProfileData;
var ImageData = /** @class */ (function () {
    function ImageData() {
    }
    return ImageData;
}());
exports.ImageData = ImageData;
