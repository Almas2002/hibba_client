"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Category = void 0;
var gender_entity_1 = require("../gender/gender.entity");
var typeorm_1 = require("typeorm");
var profile_entity_1 = require("../profile/models/profile.entity");
var Category = /** @class */ (function () {
    function Category() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Category.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Category.prototype, "value");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return gender_entity_1.Gender; }, function (gender) { return gender.categories; })
    ], Category.prototype, "gender");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return profile_entity_1.Profile; }, function (profile) { return profile.category; })
    ], Category.prototype, "profiles");
    Category = __decorate([
        (0, typeorm_1.Entity)()
    ], Category);
    return Category;
}());
exports.Category = Category;
