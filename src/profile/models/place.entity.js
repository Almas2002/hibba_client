"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Place = void 0;
var region_entity_1 = require("../../region/region.entity");
var typeorm_1 = require("typeorm");
var profile_entity_1 = require("./profile.entity");
var Place = /** @class */ (function () {
    function Place() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Place.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return region_entity_1.Region; }, function (region) { return region.places; })
    ], Place.prototype, "city");
    __decorate([
        (0, typeorm_1.Column)()
    ], Place.prototype, "street");
    __decorate([
        (0, typeorm_1.Column)()
    ], Place.prototype, "floor");
    __decorate([
        (0, typeorm_1.Column)()
    ], Place.prototype, "building");
    __decorate([
        (0, typeorm_1.Column)()
    ], Place.prototype, "apartment");
    __decorate([
        (0, typeorm_1.Column)()
    ], Place.prototype, "index");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return profile_entity_1.Profile; }, function (profile) { return profile; }),
        (0, typeorm_1.JoinColumn)()
    ], Place.prototype, "profile");
    Place = __decorate([
        (0, typeorm_1.Entity)()
    ], Place);
    return Place;
}());
exports.Place = Place;
