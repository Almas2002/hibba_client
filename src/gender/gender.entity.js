"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Gender = void 0;
var category_entity_1 = require("../category/category.entity");
var hobby_entity_1 = require("../hobby/hobby.entity");
var typeorm_1 = require("typeorm");
var profile_entity_1 = require("../profile/models/profile.entity");
var Gender = /** @class */ (function () {
    function Gender() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Gender.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Gender.prototype, "value");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return category_entity_1.Category; }, function (category) { return category.gender; })
    ], Gender.prototype, "categories");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return hobby_entity_1.Hobby; }, function (hobby) { return hobby.gender; })
    ], Gender.prototype, "hobbies");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return profile_entity_1.Profile; }, function (profile) { return profile.gender; })
    ], Gender.prototype, "profiles");
    Gender = __decorate([
        (0, typeorm_1.Entity)()
    ], Gender);
    return Gender;
}());
exports.Gender = Gender;
