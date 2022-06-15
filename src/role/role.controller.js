"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleController = void 0;
var common_1 = require("@nestjs/common");
var RoleController = /** @class */ (function () {
    function RoleController(roleService) {
        this.roleService = roleService;
    }
    RoleController.prototype.createRole = function (dto) {
        return this.roleService.create(dto);
    };
    RoleController.prototype.getRoles = function () {
        return this.roleService.getRoles();
    };
    RoleController.prototype.updateRole = function (dto) {
        return this.roleService.updateRole(dto.id, dto);
    };
    __decorate([
        (0, common_1.Post)('create-role')
    ], RoleController.prototype, "createRole");
    __decorate([
        (0, common_1.Get)('get-roles')
    ], RoleController.prototype, "getRoles");
    __decorate([
        (0, common_1.Put)('update-role')
    ], RoleController.prototype, "updateRole");
    RoleController = __decorate([
        (0, common_1.Controller)()
    ], RoleController);
    return RoleController;
}());
exports.RoleController = RoleController;
