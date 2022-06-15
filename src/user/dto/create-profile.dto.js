"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateProfileDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var CreateProfileDto = /** @class */ (function () {
    function CreateProfileDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'я отличный парень', description: 'описание профиля' })
    ], CreateProfileDto.prototype, "description");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Алматы', description: 'город' })
    ], CreateProfileDto.prototype, "region");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '19', description: 'возраст пользователя' })
    ], CreateProfileDto.prototype, "age");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Алмас', description: 'имя пользователя' })
    ], CreateProfileDto.prototype, "firstName");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Жумаханов', description: 'фамилья пользователя' })
    ], CreateProfileDto.prototype, "secondName");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '1', description: 'id гендера' })
    ], CreateProfileDto.prototype, "genderId");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '[1,2,3,4]', description: 'id гендера' })
    ], CreateProfileDto.prototype, "hobby");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '1', description: 'id категорий' })
    ], CreateProfileDto.prototype, "categoryId");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '1', description: 'id религий' })
    ], CreateProfileDto.prototype, "religionId");
    return CreateProfileDto;
}());
exports.CreateProfileDto = CreateProfileDto;
