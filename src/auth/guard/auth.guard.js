"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthGuard = void 0;
var common_1 = require("@nestjs/common");
var AuthGuard = /** @class */ (function () {
    function AuthGuard() {
    }
    AuthGuard.prototype.canActivate = function (context) {
        try {
            var req = context.switchToHttp().getRequest();
            if (!req.user) {
                throw new common_1.UnauthorizedException("Вы не зарегестрированы");
            }
            return true;
        }
        catch (e) {
            throw new common_1.UnauthorizedException("Вы не зарегестрированы");
        }
    };
    AuthGuard = __decorate([
        (0, common_1.Injectable)()
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
