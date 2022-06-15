"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserVisit = void 0;
var user_entity_1 = require("./user.entity");
var typeorm_1 = require("typeorm");
var UserVisit = /** @class */ (function () {
    function UserVisit() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], UserVisit.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ "default": 0 })
    ], UserVisit.prototype, "amount");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.visit; })
    ], UserVisit.prototype, "user");
    __decorate([
        (0, typeorm_1.Column)({ type: "date" })
    ], UserVisit.prototype, "date");
    UserVisit = __decorate([
        (0, typeorm_1.Entity)()
    ], UserVisit);
    return UserVisit;
}());
exports.UserVisit = UserVisit;
