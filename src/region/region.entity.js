"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Region = void 0;
var typeorm_1 = require("typeorm");
var profile_entity_1 = require("../profile/models/profile.entity");
var place_entity_1 = require("../profile/models/place.entity");
var Region = /** @class */ (function () {
    function Region() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Region.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Region.prototype, "value");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return profile_entity_1.Profile; }, function (profile) { return profile; })
    ], Region.prototype, "profiles");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return place_entity_1.Place; }, function (place) { return place.city; })
    ], Region.prototype, "places");
    Region = __decorate([
        (0, typeorm_1.Entity)()
    ], Region);
    return Region;
}());
exports.Region = Region;
