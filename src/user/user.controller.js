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
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var auth_guard_1 = require("../auth/guard/auth.guard");
var user_decorator_1 = require("./decorators/user.decorator");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.check = function (id) {
        return this.userService.getRoles(id);
    };
    UserController.prototype.statistic = function (dto) {
        return this.userService.getStatistic(dto);
    };
    UserController.prototype.getAdmins = function () {
        return this.userService.getAllAdmins();
    };
    UserController.prototype.getUserById = function (id) {
        return this.userService.findUserById(id);
    };
    __decorate([
        (0, common_1.Get)('check'),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        __param(0, (0, user_decorator_1.UserDecorator)('id'))
    ], UserController.prototype, "check");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "статистика" }),
        (0, common_1.Get)('statistic'),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "statistic");
    __decorate([
        (0, swagger_1.ApiOperation)({ description: 'получить админов(админ)' }),
        (0, common_1.Get)('get-admins')
    ], UserController.prototype, "getAdmins");
    __decorate([
        (0, swagger_1.ApiOperation)({ description: 'получить одного пользователя' }),
        (0, common_1.Get)("/:id"),
        __param(0, (0, common_1.Param)("id"))
    ], UserController.prototype, "getUserById");
    UserController = __decorate([
        (0, common_1.Controller)('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
