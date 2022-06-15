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
exports.GenderController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var GenderController = /** @class */ (function () {
    function GenderController(genderService) {
        this.genderService = genderService;
    }
    GenderController.prototype.createGender = function (data) {
        return this.genderService.createGender(data);
    };
    GenderController.prototype.getGenders = function () {
        return this.genderService.getGenders();
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "создать гендр" }),
        (0, swagger_1.ApiResponse)({ status: 201 }),
        (0, common_1.Post)('create-gender'),
        __param(0, (0, common_1.Body)())
    ], GenderController.prototype, "createGender");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "получить гендр" }),
        (0, swagger_1.ApiResponse)({ status: 200 }),
        (0, common_1.Get)('get-genders')
    ], GenderController.prototype, "getGenders");
    GenderController = __decorate([
        (0, swagger_1.ApiTags)("гендер"),
        (0, common_1.Controller)('gender')
    ], GenderController);
    return GenderController;
}());
exports.GenderController = GenderController;
