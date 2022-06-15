"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.HobbyController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var HobbyController = /** @class */ (function () {
    function HobbyController(hobbyService) {
        this.hobbyService = hobbyService;
    }
    HobbyController.prototype.createHobby = function (data) {
        return this.hobbyService.createHobby(data);
    };
    HobbyController.prototype.getHobbies = function (id) {
        return this.hobbyService.getHobbies(id);
    };
    HobbyController.prototype.updateHobbies = function (data, id) {
        data = __assign(__assign({}, data), { id: id });
        return this.hobbyService.updateHobby(data);
    };
    HobbyController.prototype.removeHobby = function (id) {
        return this.hobbyService.removeHobby(id);
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "создать хобби" }),
        (0, swagger_1.ApiResponse)({ status: 201 }),
        (0, common_1.Post)('create-hobby'),
        __param(0, (0, common_1.Body)())
    ], HobbyController.prototype, "createHobby");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "получить хобби" }),
        (0, swagger_1.ApiResponse)({ status: 200 }),
        (0, swagger_1.ApiQuery)({ name: "id", example: "1", description: "айди гендера", required: false }),
        (0, common_1.Get)('get-hobbies'),
        __param(0, (0, common_1.Query)('id'))
    ], HobbyController.prototype, "getHobbies");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "изменить хобби" }),
        (0, swagger_1.ApiResponse)({ status: 200 }),
        (0, common_1.Put)('update-hobby/:id'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Param)('id'))
    ], HobbyController.prototype, "updateHobbies");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "удалить хобби" }),
        (0, swagger_1.ApiResponse)({ status: 200 }),
        (0, common_1.Delete)("remove-hobby/:id"),
        __param(0, (0, common_1.Param)('id'))
    ], HobbyController.prototype, "removeHobby");
    HobbyController = __decorate([
        (0, swagger_1.ApiTags)('hobby'),
        (0, common_1.Controller)('hobby')
    ], HobbyController);
    return HobbyController;
}());
exports.HobbyController = HobbyController;
