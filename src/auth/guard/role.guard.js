"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleGuards = void 0;
var common_1 = require("@nestjs/common");
var role_decorator_1 = require("../../user/decorators/role.decorator");
var RoleGuards = /** @class */ (function () {
    function RoleGuards(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    RoleGuards.prototype.canActivate = function (context) {
        try {
            var requiredRoles_1 = this.reflector.getAllAndOverride(role_decorator_1.ROLE_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles_1) {
                return true;
            }
            var req = context.switchToHttp().getRequest();
            if (!req.user) {
                throw new common_1.UnauthorizedException('вы не зарегестрированы');
            }
            return req.user.roles.some(function (role) { return requiredRoles_1.includes(role.value); });
        }
        catch (e) {
            throw new common_1.HttpException('У вас нет прав для этого действие', 403);
        }
    };
    RoleGuards = __decorate([
        (0, common_1.Injectable)()
    ], RoleGuards);
    return RoleGuards;
}());
exports.RoleGuards = RoleGuards;
